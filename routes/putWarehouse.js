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
        console.log('Error when connecting from PutWarehouse.js');

        console.log(error);
    } else {
        console.log('Db connected from PutWarehouse.js!');
    }
});



router.put('/', function (req, res, next) {
    var capacity = req.query.cap;
    var latitude = req.query.lat;
    var longitude = req.query.long;
    var country_code = req.query.code1;
    var area_code = req.query.code2;
    var phone_num = req.query.phone;
    var email = req.query.email;
    var region_name = req.query.region_name;
    var companyID = req.query.cid;

    let sql_findRegion = `
        SELECT regionID from Region WHERE region_name = ?`;
    let data_findRegion = [region_name];

    if (companyID && region_name && capacity && latitude && longitude && country_code && area_code && phone_num && email) {
        connection.query(sql_findRegion, data_findRegion, function (error, results, fields) {

            if (error) {
                res.status(422).send('Error retrieving the regionID');
                throw error;
            }
            if (results.length > 0) {
                if (results) {
                    var regionID = results[0].regionID;
                    let sql_insertWarehouse = `
                    INSERT INTO Warehouse (capacity, latitude, longitude, country_code, area_code, phone_num, email, regionID, companyID) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

                    let data_insertWarehouse = [capacity, latitude, longitude, country_code, area_code, phone_num, email, regionID, companyID];
                    connection.query(sql_insertWarehouse, data_insertWarehouse, function (error, results, fields) {
                        if (error) {
                            res.status(422).send('Error when adding a new warehouse');
                            throw error;
                        }
                        res.status(200).send("200 Success");
                    });
                }
            } else {
                res.status(204).send("No match for the region_name given");
            }
        });

        // connection.query(sql_insertWarehouse, data_insertWarehouse, function (error, results, fields) {

        //     if (error) {
        //         res.status(422).send('Error when adding a new region');
        //         throw error;
        //     }
        //     res.status(200).send("200 Success");
        // });

    } else {
        res.status(400).send("Not enough parameters passed");
    }
});

module.exports = router;
