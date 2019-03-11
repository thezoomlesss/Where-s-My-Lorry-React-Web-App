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
        console.log('Error when connecting from setYearlyGoal.js');

        console.log(error);
    } else {
        console.log('Db connected from setYearlyGoal.js!');
    }
});

/* PUT if login is correct. */
router.put('/', function (req, res, next) {

    var companyID = req.query.cid;
    var yearlyGoal = req.query.goal;

    // update statment
    let sql = `
        UPDATE Settings
        SET yearly_goal = ?
        WHERE settingsID = ( SELECT c.settingsID FROM Company c WHERE c.companyID = ?);`;
    
    let data = [yearlyGoal, companyID];

    if (companyID && yearlyGoal) {
        connection.query(sql, data, function (error, results, fields) {

                if (error) {
                    res.status(404).send('Error when updating the yearly goal');
                    throw error;
                }
                res.status(200).send("200 Success");
            });
    } else {
        res.status(400).send("Not enough parameters passed");
    }
});

module.exports = router;
