import React, { Component } from 'react';
import './../css/App.css';
import './../css/bootstrap.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withSnackbar } from 'notistack';
import firebase from './../Firebase.js';


var secret = require("./../secret.json");

class RemovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableRegions: null,
            availableWarehouses: null,
            availableTransports: null,
            availableVehicles: null,
        };
        this.refreshRegions = this.refreshRegions.bind(this);
        this.refreshWarehouses = this.refreshWarehouses.bind(this);
        this.refreshTransports = this.refreshTransports.bind(this);
        this.refreshVehicles = this.refreshVehicles.bind(this);

        this.deleteWarehouseClick = this.deleteWarehouseClick.bind(this);
        this.deleteRegionClick = this.deleteRegionClick.bind(this);
        this.deleteTransportClick = this.deleteTransportClick.bind(this);
        this.deleteVehicleClick = this.deleteVehicleClick.bind(this);

        this.responseChecker = this.responseChecker.bind(this);
        this.removeFromState = this.removeFromState.bind(this);


    }
    componentDidMount() {
        this.refreshRegions();
        this.refreshWarehouses();
        this.refreshTransports();
        this.refreshVehicles();
    }
    refreshRegions() {
        fetch('/getRegions/full?cid=1')
            .then(res => res.json())
            .then(regions => this.setState({ availableRegions: regions }));
    }
    refreshWarehouses() {
        fetch('/getwarehouses?cid=1')
            .then(res => res.json())
            .then(warehouses => this.setState({ availableWarehouses: warehouses }));
    }
    refreshTransports() {
        fetch('/getTransports?cid=1')
            .then(res => res.json())
            .then(transports => this.setState({ availableTransports: transports }));
    }
    refreshVehicles() {
        fetch('/vehicles?cid=1')
            .then(res => res.json())
            .then(vehicles => this.setState({ availableVehicles: vehicles }));
    }
    deleteWarehouseClick(id) {
        var self = this;
        fetch('/deleteWarehouse?warehouseID=' + id + '&cid=1', { method: 'DELETE' })
            .then(res => self.responseChecker(res, id));
    }
    deleteRegionClick(id) {
        var self = this;
        fetch('/deleteRegion?regionID=' + id + '&cid=1', { method: 'DELETE' })
            .then(res => self.responseChecker(res, id));
    }
    deleteTransportClick(id) {
        var self = this;
        fetch('/deleteTransport?tID=' + id + '&cid=1', { method: 'DELETE' })
            .then(res => self.responseChecker(res, id));
    }
    deleteVehicleClick(id, number_plate) {
        var config = {
            apiKey: secret.firebase_apiKey,
            authDomain: secret.authDomain,
            databaseURL: secret.databaseURL,
            storageBucket: secret.storageBucket,
            messagingSenderId: secret.messagingSenderId
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }
        this.vehicleRef = firebase.database().ref().child('vehicles');
        this.messageRef = firebase.database().ref().child('messages');
        var numberPlate_formatted = number_plate;
        numberPlate_formatted = numberPlate_formatted.slice(0, 2) + "-" + numberPlate_formatted.slice(2, 4) + "-" + numberPlate_formatted.slice(4, 8);
        numberPlate_formatted = numberPlate_formatted.toUpperCase();

        var self = this;
        this.vehicleRef
            .orderByChild('vehicle')
            .equalTo(numberPlate_formatted)
            .on('child_added', function (snapshot) {
                var vehicle = snapshot.val();
                if (vehicle.companyID == 1) {
                    self.vehicleRef.child(snapshot.key).remove();
                }
            });
        this.messageRef
            .orderByChild('conversation')
            .equalTo('server '+numberPlate_formatted)
            .on('child_added', function (snapshot) {
                self.messageRef.child(snapshot.key).remove();
            });


        fetch('/deleteVehicle?cID=1&vID=' + id, { method: 'DELETE' })
            .then(res => self.responseChecker(res, id));
    }
    responseChecker(res, id) {
        var self = this;
        if (res.status === 200) {
            res.text().then(function (data) {
                return (data.split(' '))
            }).then(function (data_split) {
                data_split[1] > 0 ? (self.removeFromState(self, id))
                    : self.props.enqueueSnackbar('No modifications made.', { variant: 'warning' })
            });
        } else {
            if (res.status === 409) {
                self.props.enqueueSnackbar('Can\'t delete an item that is in use!', { variant: 'error' });
            } else {
                self.props.enqueueSnackbar('Error while performing the action!', { variant: 'error' });
            }
        }
    }
    removeFromState(self, id) {
        self.refreshWarehouses();
        self.refreshRegions();
        self.refreshTransports();
        self.refreshVehicles();
        self.props.enqueueSnackbar('Deleted!', { variant: 'success' });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                        <div className="col-sm-12 col-lg-4">
                            <Paper className="paper ">
                                <Typography className="TableTitle" component="h1" variant="h5">
                                    Regions
                                </Typography>
                                <Table className="removeRegionTable">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell key="region1">Identifier</TableCell>
                                            <TableCell key="region2">Region Name</TableCell>
                                            <TableCell key="region3">Country</TableCell>
                                            <TableCell key="region4">Main County</TableCell>
                                            <TableCell key="region5">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state && this.state.availableRegions && this.state.availableRegions.map(row => (
                                            <TableRow key={row.regionID + "region"}>
                                                <TableCell component="th" scope="row">
                                                    {row.regionID}
                                                </TableCell>
                                                <TableCell >{row.region_name}</TableCell>
                                                <TableCell >{row.country}</TableCell>
                                                <TableCell >{row.main_county}</TableCell>
                                                <TableCell ><Button className="deleteButton" onClick={() => { this.deleteRegionClick(row.regionID) }}>Delete</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    </Grow>
                    <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                        <div className="col-sm-12 col-lg-8">
                            <Paper className="paper warehouseTable">
                                <Typography className="TableTitle" component="h1" variant="h5">
                                    Warehouses
                                </Typography>
                                <Table className="removeWarehouseTable">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell key="warehouse1">Identifier</TableCell>
                                            <TableCell key="warehouse2">Capacity</TableCell>
                                            <TableCell key="warehouse3">Latitude</TableCell>
                                            <TableCell key="warehouse4">Longitude</TableCell>
                                            <TableCell key="warehouse5">Country Code</TableCell>
                                            <TableCell key="warehouse6">Area Code</TableCell>
                                            <TableCell key="warehouse7">Phone Number</TableCell>
                                            <TableCell key="warehouse8">Email</TableCell>
                                            <TableCell key="warehouse9">Region</TableCell>
                                            <TableCell key="warehouse10">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state && this.state.availableWarehouses && this.state.availableWarehouses.map(row => (
                                            <TableRow key={row.warehouseID + "warehouse"}>
                                                <TableCell component="th" scope="row">
                                                    {row.warehouseID}
                                                </TableCell>
                                                <TableCell >{row.capacity}</TableCell>
                                                <TableCell >{row.latitude}</TableCell>
                                                <TableCell >{row.longitude}</TableCell>
                                                <TableCell >{row.country_code}</TableCell>
                                                <TableCell >{row.area_code}</TableCell>
                                                <TableCell >{row.phone_num}</TableCell>
                                                <TableCell >{row.email}</TableCell>
                                                <TableCell >{row.region_name}</TableCell>
                                                <TableCell ><Button className="deleteButton" onClick={() => { this.deleteWarehouseClick(row.warehouseID) }}>Delete</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    </Grow>
                </div>



                {/* Remove Vehicle */}
                <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                    <Paper className="paper ">
                        <Typography className="TableTitle" component="h1" variant="h5">
                            Vehicles
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="vehicle1">Identifier</TableCell>
                                    <TableCell key="vehicle2">Number Plate</TableCell>
                                    <TableCell key="vehicle3">Position X</TableCell>
                                    <TableCell key="vehicle4">Position Y</TableCell>
                                    <TableCell key="vehicle5">Last Updated</TableCell>
                                    <TableCell key="vehicle5">Status</TableCell>
                                    <TableCell key="vehicle6">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state && this.state.availableVehicles ? this.state.availableVehicles.map(row => (
                                    <TableRow key={row.vehicleID}>
                                        <TableCell component="th" scope="row">
                                            {row.vehicleID}
                                        </TableCell>
                                        <TableCell >{row.number_plate}</TableCell>
                                        <TableCell >{row.latitude}</TableCell>
                                        <TableCell >{row.longitude}</TableCell>
                                        <TableCell >{row.last_date}</TableCell>
                                        {row.state_value === null ?
                                            <TableCell className="default-text">Not Assigned</TableCell> :
                                            row.state_value === "Active" ?
                                                <TableCell className="blue-text">Active</TableCell> :
                                                row.state_value === "Completed" ?
                                                    <TableCell className="green-text">Completed</TableCell> :
                                                    <TableCell className="red-text">Inactive Transport</TableCell>
                                        }
                                        <TableCell ><Button className="deleteButton" onClick={() => { this.deleteVehicleClick(row.vehicleID, row.number_plate) }}>Delete</Button></TableCell>
                                    </TableRow>
                                )) : console.log()}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grow>




                <div className="row">
                    <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                        <div className="col-sm-12">
                            <Paper className="paper ">
                                <Typography className="TableTitle" component="h1" variant="h5">
                                    Transports
                                </Typography>
                                <Table className="removeTransportTable">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell key="transport1">Identifier</TableCell>
                                            <TableCell key="transport2">Source Warehouse</TableCell>
                                            <TableCell key="transport3">Destination Warehouse</TableCell>
                                            <TableCell key="transport4">Departure Date</TableCell>
                                            <TableCell key="transport5">Estimated Arrival Date</TableCell>
                                            <TableCell key="transport7">Date Created</TableCell>
                                            <TableCell key="transport6">Status</TableCell>
                                            <TableCell key="transport10">Delete</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state && this.state.availableTransports && this.state.availableTransports.map(row => (
                                            <TableRow key={row.transportID + "transport"}>
                                                <TableCell component="th" scope="row">
                                                    {row.transportID}
                                                </TableCell>
                                                <TableCell >{row.source_warehouse}</TableCell>
                                                <TableCell >{row.dest_warehouse}</TableCell>
                                                <TableCell >
                                                    {row.source_day_val + "/" + row.source_month_val + "/" + row.source_year_val + " " + row.source_hour_val
                                                        + ":" + row.source_minute_val + ":" + row.source_second_val + " " + row.source_AM_PM}
                                                </TableCell>
                                                {row.day_val !== null ?
                                                    <TableCell >
                                                        {row.day_val + "/" + row.month_val + "/" + row.year_val + " " + row.hour_val
                                                            + ":" + row.minute_val + ":" + row.second_val + " " + row.AM_PM}
                                                    </TableCell>
                                                    : <TableCell> Not Specified</TableCell>
                                                }

                                                {row.updated_day_val !== null ?
                                                    <TableCell >
                                                        {row.updated_day_val + "/" + row.updated_month_val + "/" + row.updated_year_val + " " + row.updated_hour_val
                                                            + ":" + row.updated_minute_val + ":" + row.updated_second_val + " " + row.updated_AM_PM}
                                                    </TableCell>
                                                    : <TableCell> Not Specified</TableCell>
                                                }
                                                <TableCell className={row.state_value === 'Completed' ? "green-text" : row.state_value === 'Active' ? "blue-text" : "red-text"}>{row.state_value}</TableCell>
                                                <TableCell ><Button className="deleteButton" onClick={() => { this.deleteTransportClick(row.transportID) }}>Delete</Button></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    </Grow>
                </div>






            </div>
        );
    }
}
export default withSnackbar(RemovePage);