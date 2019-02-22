import React, { Component } from 'react';
import './css/App.css';
import './css/bootstrap.css';
import { Header, Footer, Navbar, Login, VehicleList, GoogleApiWrapper, ActiveVehChart } from './components';
import Button from 'react-bootstrap/Button';

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
        <div class="container">
          <div class="row">
            <div class="col-sm">
              One of three columns
            </div>
            <div class="col-sm">
              One of three columns
            </div>
            <div class="col-sm">
              One of three columns
            </div>
          </div>
        </div>
        <div className="App">
        <Button/>
        <ActiveVehChart />
        {/* <Navbar /> 
        <Login />
        <Header />
        <Footer/>
        <VehicleList/>
        <GoogleApiWrapper /> */}
        </div></div>
    );
  }
}
export default App;
