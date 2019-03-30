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
        console.log('Error when connecting from getYearlyGoal.js');

        console.log(error);
    } else {
        console.log('Db connected from getYearlyGoal.js!');
    }
});

router.get('/', function (req, res, next) {
    var company_id = req.query.cid;
    if (company_id) {
        connection.query(`
            SELECT s.yearly_goal FROM Settings s
            JOIN Company c USING(settingsID)
            WHERE c.companyID=${1}; `, { company_id }, function (error, results, fields) {
                if (error) {
                    res.status(404).send(error);
                    throw error;
                }

                if (results.length > 0) {
                    if (results) {
                        // Passing the name of the company and the status
                        // var detailResults = JSON.parse(JSON.stringify(results[0]));
                        res.json(results[0]);
                    }
                } else {
                    res.status(204).send("No match");
                }
            });

    } else {
        res.status(400).send("No parameters passed");
    }
});

router.get('/progress', function (req, res, next) {
    var company_id = req.query.cid;
    if (company_id) {
        let sql_progress = `
            SELECT COUNT(*), s.state_value, s2.yearly_goal FROM Transport t
            RIGHT JOIN Vehicle USING(transportID)
            LEFT JOIN State s USING (stateID)
            JOIN Company c USING(companyID)
            JOIN Settings s2 USING(settingsID)
            WHERE c.companyID = ?
            GROUP BY s.state_value; `;
        let sql_progress_data = [company_id];
        connection.query(sql_progress, sql_progress_data, function (error, results, fields) {

                if (error) {
                    res.status(404).send(error);
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
router.get('/progress/transports', function (req, res, next) {
    var company_id = req.query.cid;
    if (company_id) {
        let sql_progress = `
            SELECT s.state_value, COUNT(s.state_value) as 'count' FROM Transport
            LEFT JOIN State s USING(stateID)
            LEFT JOIN Vehicle v USING(transportID)
            JOIN Company c USING(companyID)
            WHERE c.companyID = ?
            GROUP BY s.state_value
            ORDER BY s.state_value; `;
        let sql_progress_data = [company_id];
        connection.query(sql_progress, sql_progress_data, function (error, results, fields) {

                if (error) {
                    res.status(404).send(error);
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

router.get('/progress/transports/all', function (req, res, next) {
    var company_id = req.query.cid;
    if (company_id) {
        let sql_progress = `
            SELECT s.state_value, d.day_val, d.month_val, d.year_val, d.hour_val, d.minute_val, d.second_val, d.AM_PM, s2.yearly_goal FROM Transport
            LEFT JOIN State s USING(stateID)
            LEFT JOIN Vehicle v USING(transportID)
            JOIN TimeDim d USING(timestampID)
            JOIN Company c USING(companyID)
            JOIN Settings s2 USING(settingsID)
            WHERE c.companyID = ?
            ORDER BY s.state_value; `;
        let sql_progress_data = [company_id];
        connection.query(sql_progress, sql_progress_data, function (error, results, fields) {

                if (error) {
                    res.status(404).send(error);
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
