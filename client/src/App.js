import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.css';
import { Header, Footer, Navbar, Login, VehicleList, GoogleApiWrapper, ActiveVehChart, SignIn } from './components';
import { BrowserRouter, Link, Switch, Route, Redirect } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";


// import Button from 'react-bootstrap/Button';

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
           <Route exact path="/" component={Navbar} />
           <Route path="/home" component={Navbar} />
           <Route path="/test1" component={Navbar} />
           <Route path="/test2" component={Navbar} />
           <Route exact path="/login" component={SignIn} />
          </Switch>
        </BrowserRouter>
        {/* <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/home" component={Navbar} />
            <Route exact path="/home/home" component={Navbar} />
            <Route exact path="/home/test1" component={Navbar} />
            <Route exact path="/home/test2" component={Navbar} />
          </Switch>
        </BrowserRouter> */}
      </div>
    );
  }
}
export default App;
