import React, { Component } from 'react';
import './../css/App.css';
import './../css/bootstrap.css';
import {
  GoogleApiWrapper, ActiveVehChart, SimpleTable, ChartVehicleBrand, ChartVehicleOrigin, Footer,
  AddPage, PopoverMenu, CompanySettings, MonthlyProgress, SimpleSnackbar, Messaging, RemovePage, LoginLogs
} from './';
import { Router, BrowserRouter, Link, Switch, Route, Redirect, HashRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import MyLocation from '@material-ui/icons/MyLocation';
import Add from '@material-ui/icons/Add';
import AddBox from '@material-ui/icons/AddBox';
import Remove from '@material-ui/icons/Remove';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import { withSnackbar } from 'notistack';
import { compose } from 'recompose';
var moment = require('moment');//  18/03/2019 13:35:42 PM
var current = moment();
console.log(current);
console.log(current.format('DD/MM/YYYY hh:mm:ss A'));
console.log(current.date());
const drawerWidth = 240;
// Paths to appear in the URL and in the navigation menu
const paths = ["Home", "Add-new", "Remove", "Map", "Messages"];
const formatted = paths.map((text, index) => (text.replace('-', ' ')));
const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 5,
    marginRight: 42,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleTableData: null,
      vehicleChartBrand: null,
      vehicleChartOrigin: null,
      open: false,
      selectedIndex: 0
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);

    this.props.enqueueSnackbar('Welcome back.', { variant: 'success' });
  }

  componentDidMount() {
    var url_split = window.location.href.split('/');
    if (url_split.length == 4) {
      for (var index = 0; index < paths.length; index++) {
        if (paths[index].toLowerCase() === url_split[3]) {
          this.setState({ selectedIndex: index });
        }
      }
    }

    fetch('/vehicles?cid=1')
      .then(res => res.json())
      .then(vehicles => this.setState({ vehicleTableData: vehicles }));
    fetch('/getVehicleOrigin?cid=1')
      .then(res => res.json())
      .then(vehicles => this.setState({ vehicleChartOrigin: vehicles }));
    fetch('/getVehicleBrand?cid=1')
      .then(res => res.json())
      .then(vehicles => this.setState({ vehicleChartBrand: vehicles }));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
    window.scrollTo(0, 0);
  };
  renderSwitch(param) {
    switch (param) {
      case 0:
        return (< ListItemIcon > {<HomeIcon />}</ListItemIcon >);
      case 1:
        return (< ListItemIcon > {<AddCircle />}</ListItemIcon >);
      case 2:
        return (< ListItemIcon > {<RemoveCircle />}</ListItemIcon >);
      case 3:
        return (< ListItemIcon > {<MyLocation />}</ListItemIcon >);
      case 4:
        return (< ListItemIcon > {<MailIcon />}</ListItemIcon >);
      default:
        return 'foo';
    }
  }
  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root + " Navbar-top-div"}>
        {/* <BrowserRouter> */}
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: this.state.open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Hi Test
            </Typography>
            <PopoverMenu />
          </Toolbar>
        </AppBar>

        {/* <BrowserRouter>
      <div> */}
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {paths.map((text, index) => (
              <ListItem
                button
                // component={MyLink}
                component={Link} to={"/" + text.toLowerCase()}
                key={text}
                selected={this.state.selectedIndex === index}
                onClick={event => this.handleListItemClick(event, index)}
              >
                {this.renderSwitch(index)}
                <ListItemText primary={formatted[index]} />
              </ListItem>

            ))}
          </List>
          <Divider />

        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {/* <Route exact path="/home" render={props=><Login/>} /> */}
            <Route exact path="/home" render={props =>
              <div>
                <ActiveVehChart />
                <ActiveVehChart />
                <ActiveVehChart />
                {this.state.vehicleChartOrigin ? <ChartVehicleOrigin vehData={this.state.vehicleChartOrigin} labelName="Number of Vehicles by Origin" size="half-page-paper" pos="paper1" /> : console.log()}
                {/* <ChartVehicleBy  size="half-page-paper" pos="paper1" /> */}
                {this.state.vehicleChartBrand ? <ChartVehicleBrand vehData={this.state.vehicleChartBrand} labelName="Number of Vehicles by Brand" size="half-page-paper" pos="paper2" /> : console.log()}
                <SimpleTable
                  data={this.state.vehicleTableData}
                  header={[
                    {
                      name: "id",
                      prop: "Identifier"
                    },
                    {
                      name: "numberPlate",
                      prop: "Number Plate"
                    },
                    {
                      name: "latitude",
                      prop: "Position X"
                    },
                    {
                      name: "longitude",
                      prop: "Position Y"
                    },
                    {
                      name: "date",
                      prop: "Last Updated"
                    }
                  ]} />
                {/* <SimpleSnackbar show="true"/> */}
                <MonthlyProgress />
                <LoginLogs />
                <Footer />
              </div>
            } />
            <Route exact path="/settings" render={props =>
              <div>
                <CompanySettings />
              </div>
            } />


            <Route exact path="/add-new" render={props =>
              <div>
                <AddPage />
                <Footer />
              </div>
            } />

            <Route exact path="/map" render={props =>
              <div>
                <GoogleApiWrapper />
                <Footer />
              </div>
            } />
            <Route exact path="/remove" render={props =>
              <div>
                <RemovePage />
                <Footer />
              </div>
            } />
            <Route exact path="/messages" render={props =>
              <div>
                <Messaging />
                <Footer />
              </div>
            } />
          </Switch>


        </main>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};



export default compose(
  withSnackbar,
  withStyles(styles, { withTheme: true })
)(Navbar)
// export default withStyles(styles, { withTheme: true })(Navbar);

// export default class Navbar extends Component {

//     render() {
//     return (
//         <div className="Header">
//         Navbar
//         </div>
//     );
//     }

// }


