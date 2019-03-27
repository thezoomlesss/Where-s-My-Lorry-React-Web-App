var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var conn_detail = require(".././conn.json")

var connection = mysql.createConnection({
    // properties
    'host': conn_detail.host,
    'user': conn_detail.user,
    'password': conn_detail.password,
    'database': conn_detail.database,
    'connectionLimit': 100,
    'port': 3306,
    'debug': false,
    'multipleStatements': true
});

connection.connect(function (error) {
    // callback
    if (!!error) {
        console.log('Error when connecting from deleteTransport.js');

        console.log(error);
    } else {
        console.log('Db connected from deleteTransport.js!');
    }
});

let sql_unlinkTransport = `UPDATE Vehicle v JOIN Company c USING(companyID) SET v.transportID = NULL WHERE v.transportID = ? AND c.companyID = ?;`;
let sql_DeleteTransport = `DELETE t from Transport t WHERE t.transportID = ?;`;

router.delete('/', function (req, res, next) {

    var companyID = req.query.cid;
    var transportID = req.query.tID;

    if (companyID && transportID) {
        let sql_unlink_data = [transportID, companyID];
        let sql_delete_data = [transportID];
        
        connection.query(sql_unlinkTransport, sql_unlink_data, function (error, results, fields) {
            if (error) {
                res.status(422).send('Error when unlinking the veh from the transportID ' + error);
                throw error;
            }
            
            connection.query(sql_DeleteTransport, sql_delete_data, function (error, results, fields) {
                if (error) {
                    if (error.message.includes("a foreign key constraint fails")) {
                        res.status(409).send('Foreign key constraint does not allow for a delete to be performed');
                    } else {
                        res.status(422).send('Error when deleting the transport');
                    }
                } else {
                    res.status(200).send("Affected-Rows " + results.affectedRows);
                }
                
            });
        });
    } else {
        res.status(400).send("Not enough parameters passed");
    }
});

module.exports = router;