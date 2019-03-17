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

router.delete('/', function (req, res) {
    var warehouseID = req.query.warehouseID;
    var company_id = req.query.cid;
    let sql_getRegion = `
            DELETE w FROM Warehouse w
            JOIN Company c USING(companyID)
            Where w.warehouseID = ? AND c.companyID = ?;   
    `;

    let data = [warehouseID, company_id];
    if (company_id && warehouseID) {
        connection.query(sql_getRegion, data, function (error, results, fields) {

            if (error) {
                res.status(422).send('Error when deleting the warehouse');
                throw error;
            }
            // sending how many rows were deleted 1 or 0
            res.status(200).send("Affected-Rows " + results.affectedRows);
            // if (results.length > 0) {
            //     if (results) {
            //         // Passing the name of the company and the status
            //         // var detailResults = JSON.parse(JSON.stringify(results[0]));
            //         res.json(results);
            //     }
            // } else {
            //     res.status(204).send("No match");
            // }
        });
    } else {
        res.status(400).send("No parameters passed");
    }
})

module.exports = router;