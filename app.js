var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var vehiclesRouter = require('./routes/vehicles');
var checkUser = require('./routes/checkUser');
var vehicleLogin = require('./routes/vehicleLogin.js');
var setVehicleLocation = require('./routes/setVehicleLocation.js');
var vehiclesPosition = require('./routes/vehiclesPosition.js');
var getActiveVehicles = require('./routes/getActiveVehicles.js');
var getVehicleOrigin = require('./routes/getVehicleOrigin.js');
var getVehicleBrand = require('./routes/getVehicleBrand.js');
var getYearlyGoal = require('./routes/getYearlyGoal.js');
var setYearlyGoal = require('./routes/setYearlyGoal.js');
var putRegion = require('./routes/putRegion.js');
var getRegions = require('./routes/getRegions.js');
var putWarehouse = require('./routes/putWarehouse.js');
var getWarehouses = require('./routes/getWarehouses.js');
var deleteWarehouse = require('./routes/deleteWarehouse.js');
var deleteRegion = require('./routes/deleteRegion.js');
var putLoginLog = require('./routes/putLoginLog.js');
var getLoginLog = require('./routes/getLoginLog.js');
var getTransports = require('./routes/getTransports.js');
var putTransport = require('./routes/putTransport.js');
var deleteTransport = require('./routes/deleteTransport.js');
var getCompanyName = require('./routes/getCompanyName.js');
var deleteVehicle = require('./routes/deleteVehicle.js');
var putVehicle = require('./routes/putVehicle.js');
var updateVehicleStatus = require('./routes/updateVehicleStatus.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/vehicles', vehiclesRouter); 
app.use('/users', usersRouter);
app.use('/checkUser', checkUser);
app.use('/vehicleLogin', vehicleLogin);
app.use('/setVehicleLocation', setVehicleLocation);
app.use('/vehiclesPosition', vehiclesPosition);
app.use('/getActiveVehicles', getActiveVehicles);
app.use('/getVehicleOrigin', getVehicleOrigin);
app.use('/getVehicleBrand', getVehicleBrand);
app.use('/getYearlyGoal', getYearlyGoal);
app.use('/getYearlyGoal/progress', getYearlyGoal);
app.use('/getYearlyGoal/progress2', getYearlyGoal);
app.use('/getYearlyGoal/progress/transports', getYearlyGoal);
app.use('/getYearlyGoal/progress/transports/all', getYearlyGoal);
app.use('/setYearlyGoal', setYearlyGoal);
app.use('/putRegion', putRegion);
app.use('/getRegions', getRegions);
app.use('/putWarehouse/full', getRegions);
app.use('/putWarehouse', putWarehouse);
app.use('/getWarehouses', getWarehouses);
app.use('/deleteWarehouse', deleteWarehouse);
app.use('/deleteRegion', deleteRegion);
app.use('/putLoginLog', putLoginLog);
app.use('/getLoginLog', getLoginLog);
app.use('/getTransports', getTransports);
app.use('/getTransports/vehicles', getTransports);
app.use('/putTransport', putTransport);
app.use('/deleteTransport', deleteTransport);
app.use('/getCompanyName', getCompanyName);
app.use('/deleteVehicle', deleteVehicle);
app.use('/putVehicle', putVehicle);
app.use('/updateVehicleStatus', updateVehicleStatus);
app.use('/updateVehicleStatus/active', updateVehicleStatus);
app.use('/updateVehicleStatus/complete', updateVehicleStatus);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
