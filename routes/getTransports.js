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
        console.log('Error when connecting from getTransport.js');

        console.log(error);
    } else {
        console.log('Db connected from getTransport.js!');
    }
});


router.get('/', function (req, res, next) {
    var companyID = req.query.cid;
    res.status(200).send("Yes");
});
router.get('/vehicles', function (req, res, next) {
    var companyID = req.query.cid;
    let sql_availableVehicles = `
        SELECT v.vehicleID, lp.number_plate FROM License_Plate lp
        JOIN Vehicle v USING(plateID)
        JOIN Company c USING(companyID)
        WHERE c.companyID = ? AND v.transportID is NULL;`;
    let data_findVeh = [companyID];

    if (companyID) {
        connection.query(sql_availableVehicles, data_findVeh, function (error, results, fields) {
            if (error) {
                res.status(422).send('Error retrieving the regionID');
                throw error;
            }
            if (results.length > 0) {
                if (results) {
                    res.json(results);
                }
            } else {
                res.status(204).send("No vehicles available");
            }
        });
    } else {
        res.status(400).send("No parameters passed");
    }

});

module.exports = router;
