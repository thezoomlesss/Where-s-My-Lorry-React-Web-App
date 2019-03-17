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
    var company_id = req.query.cid;
    let sql_getRegion = `
        Select w.warehouseID, w.capacity, w.latitude, w.longitude, w.country_code, w.area_code,
               w.phone_num, w.email, r.region_name  
        FROM Warehouse w
        JOIN Company c USING(companyID)
        JOIN Region r USING(regionID)
        WHERE c.companyID = ?;`;

    let data = [company_id];
    if (company_id) {
        connection.query(sql_getRegion, data, function (error, results, fields) {

            if (error) {
                res.status(422).send('Error when retrieving warehouses');
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
    } else {
        res.status(400).send("No parameters passed");
    }
});

module.exports = router;