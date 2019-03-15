import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Cookies from 'universal-cookie';
import { withSnackbar } from 'notistack';
import { compose } from 'recompose';
import truckLogo from './../images/truck-logo-40.png';
// import firebase from './../Firebase.js';

var secret = require("./../secret.json");
var jwt = require('jsonwebtoken');
const cookies = new Cookies();
var cookieLoginToken; // used for checking existing cookies

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
class SignIn extends Component {
  constructor(props) {
    super(props);


    this.setState({
      email: null,
      pass: null,
      emailError: false,
      passError: false,
    });

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    var proops = this.props;
    cookieLoginToken = cookies.get('loginToken');
    if (proops.auth !== undefined) {
      if (cookieLoginToken !== undefined && cookieLoginToken !== null) {
        jwt.verify(cookieLoginToken, secret.key, function (err, data) {
          if (err) {
            // error with checking the token
            proops.auth.signout();
          } else {
            proops.auth.authenticate();
            proops.history.push('/home');
          }
        })
      } else {
        console.log("Cookie undefined");
      }
    }
  }
  componentDidMount() {
    this.setState({
      emailError: false,
      passError: false
    });



    //  (console.log("Undefined Cookie");
    //       this.props.auth.isAuthenticated === true
    //         ? <Redirect to='/home' />
    //         : 0)

  }
  onEmailChange(event) {
    this.setState({
      email: event.target.value
    }, () => {
    });
  }
  onPassChange(event) {
    this.setState({
      pass: event.target.value
    }, () => {
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      emailError: true,
      passError: true
    });
    if (this.state && this.state.email && this.state.pass) {
      // add jti  company id
      if (validateEmail(this.state.email)) {
        fetch("/checkUser?email=" + this.state.email + "&pass=" + this.state.pass, { method: 'post' })
          .then(res => res.status === 200 ? (
            // this.props.auth.authenticate(),
            cookies.set('loginToken', jwt.sign({}, secret.key, { expiresIn: '24h' }), { path: '/' }),
            this.props.history.push('/home'))
            : this.props.enqueueSnackbar('Wrong details.', { variant: 'error' })).then(
            );
      } else {
        this.props.enqueueSnackbar('The email must be valid!', { variant: 'warning' })
      }


      // resMessage = res.text().then( res => resStatus = res.status))
      // .then( resMessage => console.log(resMessage+ ' ' ));
    } else {
      this.props.enqueueSnackbar('Not enough details given.', { variant: 'warning' })
    }
  }

  render() {
    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <img src={truckLogo} alt="Logo" />

          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" required onChange={this.onEmailChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" required onChange={this.onPassChange} autoComplete="current-password" />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={this.props.classes.submit}
              onClick={this.onSubmit}
            >
              Sign in
          </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withSnackbar,
  withStyles(styles)
)(SignIn)
// export default withStyles(styles)(SignIn);