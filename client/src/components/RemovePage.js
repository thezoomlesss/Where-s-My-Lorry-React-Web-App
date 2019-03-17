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

class RemovePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            availableRegions: null,
            availableWarehouses: null,
        };
        this.refreshRegions = this.refreshRegions.bind(this);
        this.refreshWarehouses = this.refreshWarehouses.bind(this);
        this.deleteWarehouseClick = this.deleteWarehouseClick.bind(this);
        this.deleteRegionClick = this.deleteRegionClick.bind(this);
        this.responseChecker = this.responseChecker.bind(this);
        this.removeWarehouseFromState = this.removeWarehouseFromState.bind(this);

    }
    componentDidMount() {
        this.refreshRegions();
        this.refreshWarehouses();
    }
    refreshRegions() {
        fetch('/getRegions/full?cid=1')
            .then(res => res.json())
            .then(regions => this.setState({ availableRegions: regions }));
    }
    refreshWarehouses() {
        fetch('/getwarehouses?cid=1')
            .then(res => res.json())
            .then(regions => this.setState({ availableWarehouses: regions }));
    }
    deleteWarehouseClick(id) {
        var self = this;
        fetch('/deleteWarehouse?warehouseID=' + id + '&cid=1', { method: 'DELETE' })
            .then(res => self.responseChecker(res, id));
        // .then(res => { return res.text() }).then((text)=>{ console.log(text) })
    }
    deleteRegionClick(id) {
        alert("clicked Region");
    }
    responseChecker(res, id) {
        var self = this;
        if( res.status === 200){
            res.text().then(function (data) {
                return (data.split(' ')) 
            }).then(function (data_split) { data_split[1] > 0 ? ( self.removeWarehouseFromState(self,id))
            : self.props.enqueueSnackbar('No modifications made.', { variant: 'warning' }) });
        } else {
            console.log("Error from delete warehouse");
        }
        


    }
    removeWarehouseFromState(self, id){
        // var i;
        // for(i=0; i < self.state.availableWarehouses.length; i++){
        //     if( self.state.availableWarehouses[i].warehouseID === id){
        //         self.state.availableWarehouses.splice(i, 1);
        //         self.props.enqueueSnackbar('Warehouse deleted.', { variant: 'success' });
        //         break;
        //     }
        // }
        self.refreshWarehouses();
        self.props.enqueueSnackbar('Warehouse deleted.', { variant: 'success' });
    }

    render() {
        return (
            <div>
                <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                    <Paper className="paper third-page-paper">
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
                </Grow>
                <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                    <Paper className="paper two-thirds-page-paper third-page-right">
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
                </Grow>
            </div>
        );
    }
}
export default withSnackbar(RemovePage);