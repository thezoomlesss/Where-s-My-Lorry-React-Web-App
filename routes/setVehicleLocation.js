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

connection.connect(function(error){
    // callback
    if(!!error){
        console.log('Error when connecting from vehicleLogin.js');
        
        console.log(error);
    }else{
        console.log('Db connected from vehicleLogin.js!');   
    }
});

/* PUT if login is correct. */
router.put('/', function(req, res, next) {

    // parameters being passed in
    var vehNumberPlate = req.query.plate;
    var pass = req.query.pass;
    var vehLat = req.query.lat;
    var vehLong = req.query.long;

    // update statment
    let sql = `UPDATE Location SET latitude = ?, longitude = ? WHERE locationID = (
        SELECT locationID FROM (
            SELECT lc.locationID FROM License_Plate lp
            JOIN Vehicle v USING (plateID)
            JOIN Location lc USING (locationID)
            JOIN Credential c USING (credentialID)
            WHERE lp.number_plate = ? AND c.pass = ?
        ) as locID);`;

    let data = [vehLat, vehLong, vehNumberPlate, pass];
    
    if(vehNumberPlate && pass && vehLat && vehLong){
        connection.query(sql, data, function (error, results, fields) {
            
            if (error) {
                res.status(404).send('Error when retrieving login from db');
                throw error;
            }
            
            
            res.status(200).send("200 It worked");
            
        });
    }else{
        res.status(400).send("Not enough parameters passed");
    }


    
});

module.exports = router;

