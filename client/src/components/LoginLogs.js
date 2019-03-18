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
    render() {
        return (
            <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                <Paper className="paper half-page-paper half-page-paper-right">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell >
                                    Test 1
                                </TableCell>
                                <TableCell >
                                    Test 2
                                </TableCell>
                                <TableCell >
                                    Test 3
                                </TableCell>
                                <TableCell >
                                    Test 4
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow >
                                <TableCell component="th" scope="row">
                                    Test1
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Test2
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Test3
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    Test4
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Paper>
            </Grow>
        );
    }
}