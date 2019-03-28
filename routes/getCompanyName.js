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
        console.log('Error when connecting from getCompanyName');

        console.log(error);
    } else {
        console.log('Db connected from getCompanyName!');
    }
});



router.get('/', function (req, res, next) {
    var companyID = req.query.cid;
    var loginID = req.query.lid;

    if (companyID && loginID){
        let sql_selectCompanyName = `
            SELECT c.cName, cl.nickname FROM Company c 
            JOIN Company_Login cl USING(companyID)
            WHERE cl.loginID = ? AND c.companyID = ? ;`;
        let sql_companyName_data = [loginID, companyID];
        connection.query(sql_selectCompanyName, sql_companyName_data, function (error, results, fields) {
            if (error) {
                res.status(422).send('Error when retrieving the company name');
                throw error;
            }
            if (results.length > 0) {
                res.status(200).send(results[results.length-1].cName + "-" + results[results.length-1].nickname);
            } else {
                res.status(204).send("No such login");
            }
        });

    } else {
        res.status(400).send("Not enough parameters passed");
    }
});

module.exports = router;