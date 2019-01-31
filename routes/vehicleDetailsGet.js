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
        console.log('Error when connecting from vehicleDetailsGet.js');
        
        console.log(error);
    }else{
        console.log('Db connected from vehicleDetailsGet.js!');   
    }
});

/* GET if login is correct. */
router.get('/', function(req, res, next) {

    // parameters being passed in
    // var company_id = req.query.cid;
    // var plate_num = req.query.plate;
    // var pass = req.query.pass;

    
    if(company_id && plate_num && pass){
        connection.query('SELECT lp.plateID, co.companyID, cr.credentialID FROM License_Plate lp JOIN Vehicle v USING (plateID) JOIN Company co USING (companyID) JOIN Credential cr USING (credentialID) WHERE lp.number_plate = \''+ plate_num+'\' AND co.companyID = \''+ company_id+'\' AND cr.pass = \''+ pass+'\';', function (error, results, fields) {
            
            if (error) {
                res.status(404).send('Error when retrieving login from db');
                throw error;
            }
            if (results.length > 0) {
                if (results) {
                    res.status(200).send("CONFIRMED");
                }
            } else {
                res.status(204).send("No match");
            }
        });
    }else{
        res.status(400).send("No parameters passed");
    }




    
});

module.exports = router;

