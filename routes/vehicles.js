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
    
    var company_id = req.query.cid;
    if(company_id){
        connection.query(`
        SELECT v.vehicleID,lp.number_plate,  l.latitude, l.longitude, l.last_date, v.transportID FROM Vehicle AS v 
        JOIN Company as c Using(companyID)
        INNER JOIN License_Plate AS lp ON v.plateID = lp.plateID 
        INNER JOIN Location AS l ON v.locationID = l.locationID 
        WHERE c.companyID = ${1}
        GROUP BY v.vehicleID;`, {company_id}, function (error, results, fields) {
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
        
    
  // res.send('respond with a resource');
     
});

module.exports = router;
