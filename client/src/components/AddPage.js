import React, { Component } from 'react';
import './../css/App.css';
import './../css/bootstrap.css';
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

class AddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            region_name: '',
            country: '',
            main_county: '',
            regionSelect: 'none',
            availableRegions: null,
            firstThirdHeight: 1,
            secondThirdHeight: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmitRegion = this.onSubmitRegion.bind(this);
        this.refreshRegions = this.refreshRegions.bind(this);

    }
    componentDidMount() {
        this.setState({
            regionSelect: 'none'
        });

        this.refreshRegions();
        var firstThirdHeightVal = this.refs.firstThird.clientHeight;
        var secondThirdHeightVal = this.refs.secondThird.clientHeight;
        console.log(firstThirdHeightVal + " " + secondThirdHeightVal)
        if (firstThirdHeightVal > secondThirdHeightVal) {
            secondThirdHeightVal = firstThirdHeightVal;
        } else {
            firstThirdHeightVal = secondThirdHeightVal;
        }
        this.refs.secondThird.style.Height = firstThirdHeightVal+'px';
        this.refs.firstThird.style.Height = firstThirdHeightVal+'px';
        this.setState({
            firstThirdHeight: firstThirdHeightVal,
            secondThirdHeight: secondThirdHeightVal,
        });

    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    onSubmitRegion(event) {
        event.preventDefault();
        if (this.state && this.state.region_name && this.state.country && this.state.main_county) {
            if (this.state.region_name.trim() !== "" && this.state.country.trim() !== "" && this.state.main_county.trim() !== "") {

                fetch('/putRegion?cid=1&region_name=' + this.state.region_name + '&region_country=' + this.state.country + '&region_county=' + this.state.main_county, { method: 'PUT' })
                    .then(res => res.status === 200 ?
                        (this.props.enqueueSnackbar('New region created.', { variant: 'success' }),
                            this.refreshRegions())
                        : this.props.enqueueSnackbar('Could not create a new region', { variant: 'error' }));

            }
        } else {
            this.props.enqueueSnackbar('Not enough details given.', { variant: 'warning' })
        }
    }
    refreshRegions() {
        fetch('/getRegions?cid=1')
            .then(res => res.json())
            .then(regions => this.setState({ availableRegions: regions }));
    }
    render() {
        // if (this.state === null || this.state === undefined) {
        // return null;
        {

            return (
                <div>
                    <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                        <div ref="firstThird" className="half-page-paper-holder third-page-paper">
                            <Paper className="paper addPaper">
                                <Typography component="h1" variant="h5">
                                    Add a new warehouse
                                 </Typography>

                                <form className="addVehForm">
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="number">Capacity</InputLabel>
                                        <Input id="region_name" name="region_name" autoComplete="region name" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="text">Latitude</InputLabel>
                                        <Input id="country" name="country" autoComplete="country" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="text">Longitude</InputLabel>
                                        <Input id="main_county" name="main_county" autoComplete="main county" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="number">Country Code</InputLabel>
                                        <Input id="region_name" name="region_name" autoComplete="region name" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="text">Area Code</InputLabel>
                                        <Input id="country" name="country" autoComplete="country" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="text">Phone Number</InputLabel>
                                        <Input id="main_county" name="main_county" autoComplete="main county" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="number">Contact Email</InputLabel>
                                        <Input id="region_name" name="region_name" autoComplete="region name" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="selectForm">
                                        <InputLabel  >Region</InputLabel>
                                        {this.state && this.state.regionSelect ? <Select
                                            value={this.state.regionSelect}
                                            onChange={this.handleChange}
                                            name="regionSelect"
                                            inputProps={{
                                                name: 'regionSelect',
                                                id: 'region-simple',
                                            }}
                                        >
                                            {this.state && this.state.availableRegions ?
                                                this.state.availableRegions.map((text, index) => (
                                                    <MenuItem key={index} value={text['region_name']}>{text['region_name']}</MenuItem>
                                                ))
                                                : null}
                                        </Select> : null}
                                    </FormControl>
                                    <div className="addPageButtonContainer">
                                        <Button
                                            className="inrowField addButton"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onSubmitRegion}
                                        >
                                            Add Warehouse
                                    </Button>
                                    </div>
                                </form>
                            </Paper>

                        </div>
                    </Grow>
                    <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                        <div ref="secondThird" className="half-page-paper-holder third-page-paper third-page-right">
                            <Paper className="paper addPaper ">
                                <Typography component="h1" variant="h5">
                                    Add a new region
                        </Typography>
                                <form className="addVehForm">
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="text">Region Name</InputLabel>
                                        <Input id="region_name" name="region_name" autoComplete="region name" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="text">Country</InputLabel>
                                        <Input id="country" name="country" autoComplete="country" required onChange={this.handleChange} autoFocus />
                                    </FormControl>
                                    <FormControl className="inrowField inRowInput" margin="normal" required >
                                        <InputLabel htmlFor="text">Main County</InputLabel>
                                        <Input id="main_county" name="main_county" autoComplete="main county" required onChange={this.handleChange} autoFocus />
                                    </FormControl>

                                    <div className="addPageButtonContainer">
                                        <Button
                                            className="inrowField addButton"
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={this.onSubmitRegion}
                                        >
                                            Add Region
                                    </Button>
                                    </div>
                                </form>
                            </Paper>
                        </div>
                    </Grow>
                    <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                        <Paper className="paper addPaper">
                            <Typography component="h1" variant="h5">
                                Add a new vehicle
                                </Typography>
                            <form className="addVehForm">
                                <FormControl className="inRowInput" margin="normal" required >
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input id="email" name="email" autoComplete="email" required autoFocus />
                                </FormControl>
                                <FormControl className="inRowInput" margin="normal" required >
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input id="email" name="email" autoComplete="email" required autoFocus />
                                </FormControl>
                                <FormControl className="inRowInput" margin="normal" required >
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input id="email" name="email" autoComplete="email" required autoFocus />
                                </FormControl>
                                <FormControl className="inRowInput" margin="normal" required >
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input id="email" name="email" autoComplete="email" required autoFocus />
                                </FormControl>
                                <FormControl className="inRowInput" margin="normal" required >
                                    <InputLabel htmlFor="email">Email Address</InputLabel>
                                    <Input id="email" name="email" autoComplete="email" required autoFocus />
                                </FormControl>
                                <div className="addPageButtonContainer">
                                    <Button
                                        className="inrowField addButton"
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={this.onSubmitRegion}
                                    >
                                        Add Vehicle
                                    </Button>
                                </div>
                            </form>
                        </Paper>
                    </Grow>
                </div>
            );

        }
    }
}
export default withSnackbar(AddPage);