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
        console.log('Error when connecting from putVehicle.js');

        console.log(error);
    } else {
        console.log('Db connected from putVehicle.js!');
    }
});

router.put('/', function (req, res, next) {
    var companyID = req.query.cid;
    var warehouseID = req.query.wid;
    var numberPlate = req.query.number_plate;
    var country_code = req.query.country_code;
    var brand = req.query.brand;
    var vehPass = req.query.pass;

    var moment = require('moment-timezone');//  18/03/2019 13:35:42 PM
    var current = moment().tz('Europe/Dublin');
    var day = current.format('DD');
    var month = current.format('MM');
    var year = current.year();
    var hour = current.format('hh');
    var min = current.format('mm');
    // var sec=current.second();
    var sec = current.format('ss');
    var AmPm = current.format('A');
    let last_date = day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec + ' ' + AmPm;

    // Get location coord from the warehouse id
    let sql_warehouse_loc = `
        SELECT w.latitude, w.longitude FROM Warehouse w
        JOIN Company c USING(companyID)
        WHERE w.warehouseID = ? AND c.companyID = ?;
    `;
    let sql_warehouse_loc_data = [warehouseID, companyID];
    let sql_add_location = `
        INSERT INTO Location (latitude, longitude, last_date) VALUES (?,?,?);
    `;
    let sql_get_location = `
        SELECT l.locationID FROM Location l
        WHERE  l.latitude = ? AND l.longitude = ?;`;

    let sql_add_plate = `INSERT INTO License_Plate (number_plate, country_origin) VALUES (?, ?);`;
    let sql_get_plate = `
        SELECT lp.plateID FROM License_Plate lp 
        WHERE number_plate = ? AND country_origin = ?;`;
    
    let sql_add_credential = `INSERT INTO Credential (pass) VALUES (?);`;
    let sql_get_credential = `SELECT credentialID FROM Credential WHERE pass = ?;`

    let sql_add_brand = `INSERT INTO Brand (brand_name) VALUES (?);`;
    let sql_get_brand = `SELECT brandID FROM Brand WHERE brand_name = ?;`;

    let sql_add_vehicle = `INSERT INTO Vehicle (locationID, companyID, plateID, credentialID, brandID) VALUES (?, ?, ?, ?, ?);`;
    if (companyID && warehouseID && numberPlate && country_code && brand && vehPass) {
        var numberPlate_formatted = numberPlate.replace(new RegExp('-', 'g'), ''); // Removing all - 
        numberPlate_formatted = numberPlate_formatted.toUpperCase();
        connection.query(sql_warehouse_loc, sql_warehouse_loc_data, function (error, results, fields) {
            if (error) {
                res.status(422).send('Error when retrieving the latitude and longitude of the warehouse');
                throw error;
            }
            if (results.length > 0) {
                var latitude = results[results.length - 1].latitude;
                var longitude = results[results.length - 1].longitude;

                let add_location_data = [latitude, longitude, last_date];
                let get_location_data = [latitude, longitude];

                // res.status(200).send("Yes " + latitude + "  "  + longitude + " " + last_date);
                connection.query(sql_add_location, add_location_data, function (error, results, fields) {
                    if (error) {
                        res.status(422).send('Error when adding the new Location');
                        throw error;
                    }
                    // res.status(200).send("Yes " + latitude + "  "  + longitude + " " + last_date);
                    connection.query(sql_get_location, get_location_data, function (error, results, fields) {
                        if (error) {
                            res.status(422).send('Error when retrieving the locationID');
                            throw error;
                        }
                        if (results.length > 0) {
                            var locationID = results[results.length - 1].locationID;

                            let add_plate_data = [numberPlate_formatted, country_code];
                            connection.query(sql_add_plate, add_plate_data, function (error, results, fields) {
                                if (error) {
                                    res.status(422).send('Error when adding a number plate');
                                    throw error;
                                }
                                
                                connection.query(sql_get_plate, add_plate_data, function (error, results, fields) {
                                    if (error) {
                                        res.status(422).send('Error when retrieving the number plate');
                                        throw error;
                                    }
                                    if (results.length > 0) {
                                        var plateID = results[results.length - 1].plateID;
                                        let sql_credential_data = [vehPass];
                                        connection.query(sql_add_credential, sql_credential_data, function (error, results, fields) {
                                            if (error) {
                                                res.status(422).send('Error when adding a credentail ');
                                                throw error;
                                            }
                                            connection.query(sql_get_credential, sql_credential_data, function (error, results, fields) {
                                                if (error) {
                                                    res.status(422).send('Error when retrieving a credential');
                                                    throw error;
                                                }
                                                if (results.length > 0) {
                                                    var credentialID = results[results.length - 1].credentialID;
                                                    let sql_brand_data = [brand];
                                                    connection.query(sql_add_brand, sql_brand_data, function (error, results, fields) {
                                                        if (error) {
                                                            res.status(422).send('Error when adding a brand ');
                                                            throw error;
                                                        }
                                                        connection.query(sql_get_brand, sql_brand_data, function (error, results, fields) {
                                                            if (error) {
                                                                res.status(422).send('Error when retrieving a brand ');
                                                                throw error;
                                                            }
                                                            if (results.length > 0) {
                                                                var brandID = results[results.length - 1].brandID;

                                                                let sql_vehicle_data = [locationID, companyID, plateID, credentialID, brandID];
                                                                connection.query(sql_add_vehicle, sql_vehicle_data, function (error, results, fields) {
                                                                    if (error) {
                                                                        res.status(422).send('Error when adding a brand ');
                                                                        throw error;
                                                                    }

                                                                    res.status(200).send("Vehicle added!");
                                                                });

                                                                


                                                            }
                                                        });
                                                    });
                                                }
                                            });
                                        });

                                    }            
                                });
                            });

                        }
                    });
                });

            }
        });
    } else {
        res.status(400).send("Not enough parameters passed");
    }
});

module.exports = router;
