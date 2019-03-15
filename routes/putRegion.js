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
        console.log('Error when connecting from PutRegion.js');

        console.log(error);
    } else {
        console.log('Db connected from PutRegion.js!');
    }
});

router.put('/', function (req, res, next) {
    var companyID = req.query.cid;
    var region_name = req.query.region_name;
    var region_country = req.query.region_country;
    var region_county = req.query.region_county;

    let sql_insert = `
        INSERT INTO Region (region_name, country, main_county, companyID) 
        VALUES (?,?,?,?);`;

    let data = [region_name, region_country, region_county, companyID];
    if (companyID && region_name && region_country && region_county) {
        connection.query(sql_insert, data, function (error, results, fields) {

            if (error) {
                res.status(422).send('Error when adding a new region');
                throw error;
            }
            res.status(200).send("200 Success");
        });

    } else {
        res.status(400).send("Not enough parameters passed");
    }
});

module.exports = router;
