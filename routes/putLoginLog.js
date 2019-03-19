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
router.put('/', function (req, res, next) {
    var companyID = req.query.cid;
    var loginID = req.query.loginid;
    var moment = require('moment-timezone');//  18/03/2019 13:35:42 PM
    var current = moment().tz('Europe/Dublin');
    // console.log(current);
    // console.log(current.format('DD/MM/YYYY hh:mm:ss A'));
    // console.log(current.date());
    var day = current.format('DD');
    var month = current.format('MM');
    var year = current.year();
    var hour = current.format('hh');
    var min = current.format('mm');
    // var sec=current.second();
    var sec = current.format('ss');
    var AmPm = current.format('A');
    let sql_insertTimeStamp = `
    INSERT INTO TimeDim (day_val, month_val, year_val, hour_val, minute_val, second_val, AM_PM) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    let sql_selectTimeID = `
        SELECT timestampID FROM TimeDim 
        WHERE day_val = ? AND month_val = ? AND year_val = ? AND hour_val = ? AND
        minute_val = ? AND second_val = ? AND AM_PM = ?;`;
    let sql_insertLoginLog= `
        INSERT INTO LoginLog (loginID, timestampID) VALUES (?, ?);
    `;    
    let data_Time = [day, month, year, hour, min, sec, AmPm];

    // This is a monster query
    // First it inserts the timestamp
    // Then it retrieves the ID of the timestamp
    // Last it inserts the login into the log with the previous ID as foreign key
    if (companyID && loginID) {
        connection.query(sql_insertTimeStamp, data_Time, function (error, results, fields) {

            if (error) {
                res.status(422).send('Error when adding a new timestamp');
                throw error;
            }
            connection.query(sql_selectTimeID, data_Time, function (error, results, fields) {

                if (error) {
                    res.status(422).send('Error when retrieving the timestamp id');
                    throw error;
                }
                if(results.length>0){
                    var timestampID = results[0].timestampID;
                    var data_LoginLog = [loginID, timestampID];
                    connection.query(sql_insertLoginLog, data_LoginLog, function (error, results, fields) {
                        if (error) {
                            res.status(422).send('Error when adding a new timestamp');
                            throw error;
                        }
                        res.status(200).send("Successfully logged");
                    });
                }
            });
        });

    } else {
        res.status(400).send("Not enough parameters passed");
    }

});

module.exports = router;
