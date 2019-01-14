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
        console.log('Error when connecting from vehicles');
        
        console.log(error);
    }else{
        console.log('Db connected from vehicles!');   
    }
});
/* GET users listing. */
router.get('/', function(req, res, next) {
        connection.query('SELECT v.vehicleID,lp.number_plate,  l.latitude, l.longitude, l.last_date FROM Vehicle AS v INNER JOIN License_Plate AS lp ON v.plateID = lp.plateID INNER JOIN Location AS l ON v.locationID = l.locationID GROUP BY v.vehicleID;', function (error, results, fields) {
            if (error) throw error;
            
            // results = JSON.stringify(results);
            // results = JSON.parse(results);
            res.json(results);
            
            
        });
    
  // res.send('respond with a resource');
     
});

module.exports = router;
