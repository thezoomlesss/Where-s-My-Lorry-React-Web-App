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
        console.log('Error when connecting from updateVehicleStatus.js');

        console.log(error);
    } else {
        console.log('Db connected from updateVehicleStatus.js!');
    }
});


router.put('/active', function (req, res, next) {
    var cID = req.query.cID;
    var cameraID = req.query.cameraID;
    var warehouseID = req.query.wID;
    var numberPlate = req.query.number_plate;

    var sql_vehID = `
                SELECT v.vehicleID, lp.number_plate FROM Vehicle v
                JOIN License_Plate lp USING(plateID)
                WHERE lp.number_plate = ?;`
    var vehID_data = [];

    var sql_stateID = `
        SELECT v.vehicleID, t.transportID, s.stateID, s.state_value FROM State s
        JOIN Transport t Using(StateID)
        JOIN Vehicle v Using(transportID)
        WHERE v.vehicleID = ?;`;
    var stateID_data = [];

    var sql_setState=`
        UPDATE State SET state_value = "Completed" WHERE stateID=?;`;
    var setState_data = [];
    if (cID && cameraID && warehouseID && numberPlate) {
        vehID_data = [numberPlate]
        connection.query(sql_vehID, vehID_data, function (error, results, fields) {
            if (error) {
                res.status(422).send('Error when retrieving the id of the vehicle  ');
                throw error;
            }
            if (results.length > 0) {
                var vehID = results[results.length - 1].vehicleID;
                stateID_data = [vehID];


                connection.query(sql_stateID, stateID_data, function (error, results, fields) {
                    if (error) {
                        res.status(422).send('Error when retrieving the id of the state  ');
                        throw error;
                    }
                    if (results.length > 0) {
                        var stateID = results[results.length - 1].stateID;
                        
                        // Update state to completed
                        setState_data = [stateID];

                        connection.query(sql_setState, setState_data, function (error, results, fields) {
                            if (error) {
                                res.status(422).send('Error when retrieving the id of the state  ');
                                throw error;
                            }
                                res.status(200).send("Vehicle state set as completed");
                        });
        
                    }else{
                        res.status(422).send("No state for this veh id");
                    }
                });


            }else{
                res.status(422).send("Wrong number plate");
            }
        });
    } else {
        res.status(422).send("Not enough parameters passed");
    }
});
router.put('/complete', function (req, res, next) {
    res.status(200).send("200 Success complete");
});

module.exports = router;
