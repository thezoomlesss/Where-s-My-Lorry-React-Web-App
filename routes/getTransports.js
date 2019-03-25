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

// Used to display all active transports
router.get('/', function (req, res, next) {
    var companyID = req.query.cid;

    let sql_transports = `
        Select 
        t.transportID, w1.warehouse_name as 'source_warehouse', w2.warehouse_name as 'dest_warehouse', 
        d1.day_val as 'source_day_val', d1.month_val as 'source_month_val', d1.year_val as 'source_year_val', d1.hour_val as 'source_hour_val', d1.minute_val as 'source_minute_val', d1.second_val as 'source_second_val', d1.AM_PM as 'source_AM_PM',
        d2.day_val, d2.month_val, d2.year_val, d2.hour_val, d2.minute_val, d2.second_val, d2.AM_PM, 
        s.date_updated, s.state_value
        FROM Transport t
        JOIN Warehouse w1 ON w1.warehouseID = t.source_warehouseID
        JOIN Warehouse w2 ON w2.warehouseID = t.dest_warehouseID
        JOIN TimeDim d1 ON d1.timestampID = t.departure_dateID
        LEFT JOIN TimeDim d2 ON d2.timestampID = t.arrival_dateID
        JOIN State s USING(stateID)
        JOIN Company c ON c.companyID = w1.companyID
        WHERE c.companyID=?;
    `;

    let data = [companyID];
    if (companyID) {
        connection.query(sql_transports, data, function (error, results, fields) {
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

// used to get the vehicles available for new transports
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
