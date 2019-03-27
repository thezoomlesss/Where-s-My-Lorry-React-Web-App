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
        console.log('Error when connecting from putTransport.js');

        console.log(error);
    } else {
        console.log('Db connected from putTransport.js!');
    }
});


router.put('/', function (req, res, next) {
    var companyID = req.query.cid;
    var vehicleID = req.query.vehID;
    var w1ID = req.query.w1;
    var w2ID = req.query.w2;
    var departure_time = req.query.dep_time;
    var arrival_time = req.query.arv_time;



    var moment = require('moment-timezone');//  18/03/2019 13:35:42 PM
    var current = moment().tz('Europe/Dublin');
    // console.log(current);
    // console.log(current.format('DD/MM/YYYY hh:mm:ss A'));
    // console.log(current.date());
    var day = current.format('DD');
    var month = current.format('MM');
    var year = current.year();
    var hour = current.format('hh');
    var min = current.format('mm');
    // var sec=current.second();
    var sec = current.format('ss');
    var AmPm = current.format('A');
    let data_Time_current = [day, month, year, hour, min, sec, AmPm];

    let sql_insertTimeStamp = `
        INSERT INTO TimeDim (day_val, month_val, year_val, hour_val, minute_val, second_val, AM_PM) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    let sql_selectTimeID = `
        SELECT timestampID FROM TimeDim 
        WHERE day_val = ? AND month_val = ? AND year_val = ? AND hour_val = ? AND
        minute_val = ? AND second_val = ? AND AM_PM = ?;`;

    let sql_insertState = ` INSERT INTO State (timestampID, state_value) Values ( ?, "Inactive"); `;
    let sql_state_data;
    let sql_selectState = `SELECT stateID FROM State where timestampID = ?`;
    let sql_selectState_data;
    let sql_insertTransport = `INSERT INTO Transport (source_warehouseID, dest_warehouseID, departure_dateID, arrival_dateID, stateID ) VALUES (?,?,?,?,?);`;
    let sql_Transport_data;
    let sql_retrieveTransport =`SELECT transportID FROM Transport WHERE source_warehouseID = ? AND dest_warehouseID = ? AND departure_dateID = ? AND arrival_dateID = ? AND stateID = ?;`;
    let sql_updateVeh = `UPDATE Vehicle SET transportID = ? WHERE vehicleID = ?;` 
    let sql_updateVeh_data;
    if (companyID && vehicleID && w1ID && w2ID && departure_time && arrival_time) {
        // 2020-01-01 01:00
        // Departure time
        departure_time_half = departure_time.split(' ');
        departure_time_date = departure_time_half[0].split('-');
        departure_time_time = departure_time_half[1].split(':');

        var dep_year = departure_time_date[0];
        var dep_month = departure_time_date[1];
        var dep_day = departure_time_date[2];

        var dep_hour = departure_time_time[0];
        var dep_min = departure_time_time[1];
        var dep_sec = "00";
        var dep_AmPm = "AM";

        let data_Time_departure = [dep_day, dep_month, dep_year, dep_hour, dep_min, dep_sec, dep_AmPm];

        // Arrival time

        arrival_time_half = arrival_time.split(' ');
        arrival_time_date = arrival_time_half[0].split('-');
        arrival_time_time = arrival_time_half[1].split(':');

        var arv_year = arrival_time_date[0];
        var arv_month = arrival_time_date[1];
        var arv_day = arrival_time_date[2];

        var arv_hour = arrival_time_time[0];
        var arv_min = arrival_time_time[1];
        var arv_sec = "00";
        var arv_AmPm = "AM";
        let data_Time_arrival = [arv_day, arv_month, arv_year, arv_hour, arv_min, arv_sec, arv_AmPm];

        // res.status(200).send(
        //     "Departure: " + dep_day + " " + dep_month + " " + dep_year + " " + dep_hour + " " + dep_min + " " + dep_sec + " " + dep_AmPm + "   Arrival: "
        //     + arv_day + " " + arv_month + " " + arv_year + " " + arv_hour + " " + arv_min + " " + arv_sec + " " + arv_AmPm +
        //     "    Current: " + day + " " + month + " " + year + " " + hour + " " + min + " " + sec + " " + AmPm);

        // Inserting the timestamp for departure date
        connection.query(sql_insertTimeStamp, data_Time_departure, function (error, results, fields) {
            if (error) {
                res.status(422).send('Error when adding the new departure timestamp');
                throw error;
            }
            // Inserting the timestamp for arrival date
            connection.query(sql_insertTimeStamp, data_Time_arrival, function (error, results, fields) {
                if (error) {
                    res.status(422).send('Error when adding the new arrival timestamp');
                    throw error;
                }

                // Inserting the timestamp for current date (for state generation)
                connection.query(sql_selectTimeID, data_Time_current, function (error, results, fields) {
                    if (error) {
                        res.status(422).send('Error when adding the new state timestamp');
                        throw error;
                    }

                    // Retrieving the timestampID for departure date
                    connection.query(sql_selectTimeID, data_Time_departure, function (error, results, fields) {
                        if (error) {
                            res.status(422).send('Error when retrieving the departure timestamp');
                            throw error;
                        }

                        if (results.length > 0) {
                            var departure_timestampID = results[results.length-1].timestampID;

                            // Retrieving the timestampID for arrival date
                            connection.query(sql_selectTimeID, data_Time_arrival, function (error, results, fields) {
                                if (error) {
                                    res.status(422).send('Error when Retrieving the new arrival timestamp');
                                    throw error;
                                }
                                if (results.length > 0) {
                                    var arrival_timestampID = results[results.length-1].timestampID;

                                    // Adding the timestamp for current date
                                    connection.query(sql_insertTimeStamp, data_Time_current, function (error, results, fields) {
                                        if (error) {
                                            res.status(422).send('Error when adding the  current timestamp');
                                            throw error;
                                        }
                                        // Retriving the ID of the current state timestamp
                                        connection.query(sql_selectTimeID, data_Time_current, function (error, results, fields) {
                                            if (error) {
                                                res.status(422).send('Error when Retrieving the new current timestamp');
                                                throw error;
                                            }

                                            if (results.length > 0) {
                                                var current_timestampID = results[results.length-1].timestampID;
                                                sql_state_data = [current_timestampID];
                                                
                                                //Inserting the state
                                                connection.query(sql_insertState, sql_state_data, function (error, results, fields) {
                                                    if (error) {
                                                        res.status(422).send('Error when adding the new state');
                                                        throw error;
                                                    }
                                                    sql_selectState_data = [current_timestampID];
                                                    // Retrieving the stateID
                                                    connection.query(sql_selectState, sql_selectState_data, function (error, results, fields) {
                                                        if (error) {
                                                            res.status(422).send('Error when retrieving the new state');
                                                            throw error;
                                                        }
                                                        if (results.length > 0) {
                                                            var stateID = results[results.length-1].stateID;

                                                            // Insert Transport
                                                            sql_Transport_data = [w1ID, w2ID, departure_timestampID, arrival_timestampID, stateID];
                                                            connection.query(sql_insertTransport, sql_Transport_data, function (error, results, fields) {
                                                                if (error) {
                                                                    res.status(422).send('Error when adding the transport ' + error);
                                                                    throw error;
                                                                }
                                                                // Retrieve the id of the transport inserted
                                                                connection.query(sql_retrieveTransport, sql_Transport_data, function (error, results, fields) {
                                                                    if (error) {
                                                                        res.status(422).send('Error when retrieving the transportID ' + error);
                                                                        throw error;
                                                                    }
                                                                    if (results.length > 0) {
                                                                        var transportID = results[results.length-1].transportID;
                                                                        sql_updateVeh_data = [transportID, vehicleID];
                                                                        connection.query(sql_updateVeh, sql_updateVeh_data, function (error, results, fields) {
                                                                            if (error) {
                                                                                res.status(422).send('Error when retrieving the transportID ' + error);
                                                                                throw error;
                                                                            }
                                                                            res.status(200).send("Transport added and vehicle updated");
                                                                        });
                                                                    }            
                                                                });
                                                                
                                                            });
                                                        }
                                                    });
                                                });
                                                //res.status(200).send("Dep: " + departure_timestampID + "   Arv: " + arrival_timestampID +"   Current:" + current_timestampID);
                                            }
                                        });


                                    });

                                }
                            });
                        }


                    });

                });
            });
        });

    } else {
        res.status(400).send("Not enough parameters passed");
    }

});

module.exports = router;
