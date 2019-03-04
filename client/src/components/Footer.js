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
                        
                        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                            <a target="_blank" href="https://github.com/thezoomlesss/IFMS">GitHub Project</a>
                        </Typography>
                    </footer>
                </Paper>
            </Grow>
        );
    }

}