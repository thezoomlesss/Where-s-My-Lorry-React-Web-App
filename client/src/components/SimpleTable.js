import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  // root: {
  //   width: '100%',
  //   marginTop: theme.spacing.unit * 3,
  //   overflowX: 'auto',
  // },
  // table: {
  //   minWidth: 700,
  // }
});

let id = 0;
function createData(name, calories, fat, carbs) {
  id += 1;
  return { id, name, calories, fat, carbs };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

// function SimpleTable(props) {
//export default ({ data, header }) =>
export default class SimpleTable extends Component {
  

  render() {
    return (
      <Paper className="paper">
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

}
