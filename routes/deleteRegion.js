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
    var regionID = req.query.regionID;
    var company_id = req.query.cid;
    let sql_deleteRegion = `
            DELETE r FROM Region r
            JOIN Company c USING(companyID)
            Where r.regionID = ? AND c.companyID = ?;   
    `;

    let data = [regionID, company_id];
    if (company_id && regionID) {
        connection.query(sql_deleteRegion, data, function (error, results, fields) {

            if (error) {
                if (error.message.includes("a foreign key constraint fails")) {
                    res.status(409).send('Foreign key constraint does not allow for a delete to be performed');
                } else {
                    res.status(422).send('Error when deleting the region');
                }
            } else {
                res.status(200).send("Affected-Rows " + results.affectedRows);
            }
        });
    } else {
        res.status(400).send("No parameters passed");
    }
})
module.exports = router;