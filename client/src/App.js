import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.css';
import { Header, Footer, Navbar, Login, VehicleList, GoogleApiWrapper, ActiveVehChart, SignIn } from './components';
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";


// import Button from 'react-bootstrap/Button';
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    //setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    //setTimeout(cb, 100) // fake async
  }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
)
const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuth.isAuthenticated === false
      ? <Component {...props} />
      : <Redirect to='/home' />
  )} />
)
class App extends Component {
  state = { users: [] }
  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
           {/* <Route exact path="/" component={Navbar} />
           <Route path="/home" component={Navbar} />
           <Route path="/test1" component={Navbar} />
           <Route path="/test2" component={Navbar} /> */}
           {/* <PrivateRoute path='/' component={Navbar} /> */}

           <PrivateRoute path='/home' component={Navbar} />
           <PrivateRoute path='/test1' component={Navbar} />
           <PrivateRoute path='/test2' component={Navbar} />
           <PublicRoute exact path="/login" component={(props) => <SignIn {...props} auth={fakeAuth} />} />
          

           {/* <Route path='/home' component={Navbar} />
           <Route path='/test1' component={Navbar} />
           <Route path='/test2' component={Navbar} />
           <Route exact path="/login" component={(props) => <SignIn {...props} auth={fakeAuth} />} /> */}
          
          </Switch>
        </BrowserRouter>
        
      </div>
    );
  }
}
export default App;
