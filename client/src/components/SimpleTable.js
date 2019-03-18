import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

// function SimpleTable(props) {
//export default ({ data, header }) =>
export default class SimpleTable extends Component {


  render() {
    return (
      <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
        <Paper className="paper ">
          <Table>
            <TableHead>
              <TableRow>
                {this.props.header.map((head, i) =>
                  <TableCell key={`thc-${i}`}>
                    {head.prop}
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props && this.props.data && this.props.data.map(row => (
                <TableRow key={row.vehicleID}>
                  <TableCell component="th" scope="row">
                    {row.vehicleID}
                  </TableCell>
                  <TableCell >{row.number_plate}</TableCell>
                  <TableCell >{row.latitude}</TableCell>
                  <TableCell >{row.longitude}</TableCell>
                  <TableCell >{row.last_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grow>
    );
  }

}
