import React, { Component } from 'react';
import './../css/App.css';
import './../css/bootstrap.css';
import { Login, GoogleApiWrapper, ActiveVehChart, SimpleTable, SignIn } from './';
// VehicleList, Header, Footer,
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
import Paper from '@material-ui/core/Paper';


const drawerWidth = 240;
const MyLink = props => <Link to="/open-collective" {...props} />
// Paths to appear in the URL and in the navigation menu
const paths = ["home", "test1", "test2", "test3"];
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

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
      open: false,
      selectedIndex: 0
    };
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);

  }

  componentDidMount() {
    fetch('/vehicles')
      .then(res => res.json())
      .then(vehicles => this.setState({ vehicleTableData: vehicles }));
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleListItemClick = (event, index) => {
    this.setState({ selectedIndex: index });
  };
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
            <Typography className="NameHolder" variant="h6" color="inherit" noWrap>
              Hi, <span className="nameSpan">John Smith</span>
            </Typography>
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
                component={Link} to={"/" + text}
                key={text}
                selected={this.state.selectedIndex === index}
                onClick={event => this.handleListItemClick(event, index)}
              >
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
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
              </div>
            } />
            <Route exact path="/" render={props =>
              <div>
                <ActiveVehChart />
                <ActiveVehChart />
                <ActiveVehChart />
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
              </div>
            } />
            <Route exact path="/test1" render={props => <SignIn />} />
            <Route exact path="/test2" render={props => <GoogleApiWrapper />} />
          </Switch>
          {/* </BrowserRouter> */}
          {/* <ActiveVehChart />
          <ActiveVehChart />
          <ActiveVehChart />
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
          <Login />
          <GoogleApiWrapper />
          <Paper>
            <footer className={"FOOOOTERBOI"}>
              <Typography variant="h6" align="center" gutterBottom>
                Footer
            </Typography>
              <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Something here to give the footer a purpose!
            </Typography>
            </footer>
          </Paper> */}
          {/* End footer */}
        </main>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};



export default withStyles(styles, { withTheme: true })(Navbar);

// export default class Navbar extends Component {

//     render() {
//     return (
//         <div className="Header">
//         Navbar
//         </div>
//     );
//     }

// }


