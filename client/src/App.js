import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.css';
import { Navbar, SignIn } from './components';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Cookies from 'universal-cookie';
import { SnackbarProvider } from 'notistack';

const cookies = new Cookies();
var secret = require("./secret.json");
var jwt = require('jsonwebtoken');
var cookieLoginToken;
// import Button from 'react-bootstrap/Button';
const Auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 10) // fake async
  },
  signout(cb) {
    cookies.remove('loginToken');
    cookies.remove('cID');
    cookies.remove('loginID');
    this.isAuthenticated = false;
    setTimeout(cb, 10) // fake async
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route {...rest} render={(props) => (

    cookieLoginToken = cookies.get('loginToken'),
    cookieLoginToken !== undefined && cookieLoginToken !== null ? (jwt.verify(cookieLoginToken, secret.key, function (err, data) {
      if (err) {
        Auth.signout();
      } else {
        Auth.authenticate();
      }
    })) : (console.log("Undefined Cookie")),
    Auth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isAuthenticated === false
      ? <Component {...props} />
      : <Redirect to='/home' />
  )} />
)
class App extends Component {
  // state = { users: [] }
  // componentDidMount() {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => this.setState({ users }));
  // }
  render() {
    return (
      <div>
        <SnackbarProvider
          maxSnack={5}
        >
          <BrowserRouter>
            <Switch>
              <PublicRoute exact path="/login" component={(props) => <SignIn {...props} auth={Auth} />} />
              <Route exact path='/' render={(props) => (
                <Redirect to='/home' />)} />
              <PrivateRoute path='/' component={Navbar} />


            </Switch>
          </BrowserRouter>
        </SnackbarProvider>

      </div>
    );
  }
}
export default App;
