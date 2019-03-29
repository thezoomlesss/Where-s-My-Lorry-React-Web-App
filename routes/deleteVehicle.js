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
        console.log('Error when connecting from deleteVehicle.js');

        console.log(error);
    } else {
        console.log('Db connected from deleteVehicle.js!');
    }
});

router.delete('/', function (req, res) {
    var companyID = req.query.cID;
    var vehicleID = req.query.vID;

    if (companyID && vehicleID) {
        let sql_deleteVehicle = `DELETE v FROM Vehicle v WHERE v.vehicleID = ? AND v.companyID = ? `;
        let sql_deleteVehicle_data = [vehicleID, companyID];

        connection.query(sql_deleteVehicle, sql_deleteVehicle_data, function (error, results, fields) {
            if (error) {
                if (error.message.includes("a foreign key constraint fails")) {
                    res.status(409).send('Foreign key constraint does not allow for a delete to be performed');
                } else {
                    res.status(422).send('Error when deleting the vehicle');
                }
            } else {
                res.status(200).send("Affected-Rows " + results.affectedRows);
            }
        });
    } else {
        res.status(400).send("No parameters passed");
    }
});



module.exports = router;