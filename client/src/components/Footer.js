import React, { Component } from 'react';
import './../css/App.css';

export default class Footer extends Component {
    state= {vehicles: []}
    componentDidMount(){
        fetch('/vehicles')
        .then(res=>res.json())
        .then(vehicles=> this.setState({vehicles}));
    }
    render() {
    return (
        <div className="test">
        From Footer
        {this.state.vehicles.map(vehicle=> 
          <li key={vehicle.vehicleID}>{vehicle.vehicleID + " " +vehicle.number_plate + " " + vehicle.latitude + " " + vehicle.longitude}</li>
        )}
        </div>
    );
    }

}