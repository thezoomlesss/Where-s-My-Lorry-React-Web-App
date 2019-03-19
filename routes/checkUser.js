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
        console.log('Error when connecting from checkUser');

        console.log(error);
    } else {
        console.log('Db connected from checkUser!');
    }
});
/* POST login details. */
router.post('/', function (req, res, next) {

    // parameters being passed in
    var loginEmail = req.query.email;
    var loginPass = req.query.pass;

    // console.log("loginEmail: " + loginEmail);
    // console.log("loginPass: " + loginPass);
    connection.query(`
        SELECT c.companyID, cl.loginID FROM Company c
        JOIN Company_Login cl USING(companyID)
        WHERE cl.login_email = \'`+ loginEmail + `\' AND cl.login_pass = \'` + loginPass + `\';`, function (error, results, fields) {
        if (error) {
            res.status(200).send('Error when retrieving login from db');
            throw error;
        }
        if (results.length > 0) {
            if (results) {
                res.status(200).send("companyID:" + results[0].companyID + " loginID:"+ results[0].loginID);
            }
        } else {
            res.status(204).send("No match");
        }
    });

   
});

module.exports = router;
