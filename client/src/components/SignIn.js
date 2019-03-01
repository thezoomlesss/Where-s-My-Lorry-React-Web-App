import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Redirect, Route } from "react-router-dom";
import Cookies from 'universal-cookie';

var secret = require("./../secret.json");
var jwt = require('jsonwebtoken');
const cookies = new Cookies();

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
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});
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

    console.log(this.props.auth);
  }
  componentDidMount() {
    this.setState({
      emailError: false,
      passError: false
    });
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
      var resMessage, resStatus;
      // add jti  company id
      fetch("/checkUser?email=" + this.state.email + "&pass=" + this.state.pass, { method: 'post' })
        .then(res => res.status === 200 ? (
            this.props.auth.authenticate(),
            cookies.set('loginToken', jwt.sign({ }, secret.key, { expiresIn: '24h' }) , { path: '/' }) ,
            this.props.history.push('/home')) 
            : console.log("204 NOOOO")).then(
          );
        
        // resMessage = res.text().then( res => resStatus = res.status))
      // .then( resMessage => console.log(resMessage+ ' ' ));
    }
  }

  render() {
    return (
      <main className={this.props.classes.main}>
        <CssBaseline />
        <Paper className={this.props.classes.paper}>
          <Avatar className={this.props.classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
        </Typography>
          <form className={this.props.classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              {/* error={this.state.emailError} */}
              <Input id="email" name="email" autoComplete="email" required onChange={this.onEmailChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              {/* error={this.state.passError} */}
              <Input name="password" type="password" id="password" required onChange={this.onPassChange} autoComplete="current-password" />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
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

export default withStyles(styles)(SignIn);