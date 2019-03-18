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


router.get('/', function (req, res, next) {
    // parameters being passed in
    var company_id = req.query.cid;

    let sql_getLoginLog = `
    SELECT ll.loginlogID, cl.nickname, td.day_val, td.month_val, td.year_val, td.hour_val, td.minute_val, td.second_val, td.AM_PM FROM Company c
    JOIN Company_Login cl USING(companyID)
    JOIN LoginLog ll USING(loginID)
    JOIN TimeDim td USING(timestampID)
    WHERE c.companyID = ?;`;

    let data = [company_id];

    if(company_id){
        connection.query(sql_getLoginLog, data, function (error, results, fields) {

            if (error) {
                res.status(422).send('Error when retrieving login log');
                throw error;
            }
            if (results.length > 0) {
                if (results) {
                    // Passing the name of the company and the status
                    // var detailResults = JSON.parse(JSON.stringify(results[0]));
                    res.json(results);
                }
            } else {
                res.status(204).send("No match");
            }
        });
    }else{
        res.status(400).send("No parameters passed");
    }
});

module.exports = router;