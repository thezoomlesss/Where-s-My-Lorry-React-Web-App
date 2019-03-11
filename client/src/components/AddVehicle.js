import React, { Component } from 'react';
import './../css/App.css';
import './../css/bootstrap.css';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

export default class AddVehicle extends Component {
    render() {
        return (
            <Paper className="paper">
                <Typography component="h1" variant="h5">
                    Add a new vehicle
                </Typography>
                <form className="addVehForm">
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" required onChange={this.onEmailChange} autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" required onChange={this.onEmailChange} autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" required onChange={this.onEmailChange} autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" required onChange={this.onEmailChange} autoFocus />
                    </FormControl>
                    <FormControl margin="normal" required >
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id="email" name="email" autoComplete="email" required onChange={this.onEmailChange} autoFocus />
                    </FormControl>
                </form>
            </Paper>
        );
    }
}