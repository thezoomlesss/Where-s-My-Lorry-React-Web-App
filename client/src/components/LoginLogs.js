import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

export default class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: null,
        }
    }

    componentDidMount() {
        fetch('/getLoginLog?cid=1')
            .then(res => res.json())
            .then(logs => this.setState({ logs: logs }));
    }

    render() {
        return (
            <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                <Paper className="paper half-page-paper half-page-paper-right">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    Identifier
                                </TableCell>
                                <TableCell >
                                    Name
                                </TableCell>
                                <TableCell >
                                    Time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state && this.state.logs && this.state.logs.map(row => (
                                <TableRow key={row.loginlogID + " login"}>
                                    <TableCell component="th" scope="row">{row.loginlogID}</TableCell>
                                    <TableCell component="th" scope="row">{row.nickname}</TableCell>
                                    <TableCell component="th" scope="row">
                                    {row.day_val+'/'} 
                                    {row.month_val+'/'}
                                    {row.year_val+' '} 
                                    {row.hour_val+':'} 
                                    {row.minute_val+':'} 
                                    {row.second_val+' '} 
                                    {row.AM_PM}
                                    </TableCell>
                                </TableRow>
                            ))
                            }

                            


                        </TableBody>
                    </Table>
                </Paper>
            </Grow>
        );
    }
}