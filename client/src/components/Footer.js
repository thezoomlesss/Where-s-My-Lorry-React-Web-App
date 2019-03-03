import React, { Component } from 'react';
import './../css/App.css';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';

export default class Footer extends Component {
    componentDidMount() {
        
    }
    render() {
        return (
            <Grow in="true"  {...(true ? { timeout: 1700 } : {})}>
                <Paper>
                    <footer className={"FOOOOTERBOI"}>
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
                        </Typography>
                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                            Something here to give the footer a purpose!
                        </Typography>
                    </footer>
                </Paper>
            </Grow>
        );
    }

}