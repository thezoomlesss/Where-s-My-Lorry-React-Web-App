import React, { Component } from 'react';
import './../css/App.css';

export default class VehicleList extends Component {
    constructor(props) {
        super(props);
        this.test = "";
    }
    state = { vehicles: [] }

    componentDidMount() {
        fetch('/vehicles')
            .then(res => res.json())
            .then(vehicles => this.setState({ vehicles }));
    }
    render() {
        return (
            <div className="VehicleList">


                <div className="table-title">
                    <h3>Vehicles in your fleet</h3>
                </div>
                <table className="table-fill">
                    <thead>
                        <tr>
                            <th className="text-left">Car ID</th>
                            <th className="text-left">Number Plate</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">

                        {this.state.vehicles.map(vehicle =>
                            <tr key={vehicle.vehicleID}>
                                <td className="text-left">{vehicle.vehicleID}</td>
                                <td className="text-left">{[vehicle.number_plate.slice(0, 2), ' - ', vehicle.number_plate.slice(2, 4), ' - ', vehicle.number_plate.slice(4)].join('')}</td>
                            </tr>
                        )}


                        {this.state.vehicles.map(vehicle =>
                            <tr key={vehicle.vehicleID}>
                                <td className="text-left">{vehicle.vehicleID}</td>
                                <td className="text-left">{[vehicle.number_plate.slice(0, 2), ' - ', vehicle.number_plate.slice(2, 4), ' - ', vehicle.number_plate.slice(4)].join('')}</td>
                            </tr>
                        )}


                        {this.state.vehicles.map(vehicle =>
                            <tr key={vehicle.vehicleID}>
                                <td className="text-left">{vehicle.vehicleID}</td>
                                <td className="text-left">{[vehicle.number_plate.slice(0, 2), ' - ', vehicle.number_plate.slice(2, 4), ' - ', vehicle.number_plate.slice(4)].join('')}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        );
    }

}