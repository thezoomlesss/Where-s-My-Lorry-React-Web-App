import React, { Component } from 'react';
import './../App.css';

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


                <div class="table-title">
                    <h3>Vehicles in your fleet</h3>
                </div>
                <table class="table-fill">
                    <thead>
                        <tr>
                            <th class="text-left">Car ID</th>
                            <th class="text-left">Number Plate</th>
                        </tr>
                    </thead>
                    <tbody class="table-hover">

                    {this.state.vehicles.map(vehicle =>
                            <tr>
                                <td class="text-left">{vehicle.vehicleID}</td>
                                <td class="text-left">{[vehicle.number_plate.slice(0, 2), ' - ', vehicle.number_plate.slice(2, 4), ' - ', vehicle.number_plate.slice(4)].join('')}</td>
                            </tr>
                        )}


{this.state.vehicles.map(vehicle =>
                            <tr>
                                <td class="text-left">{vehicle.vehicleID}</td>
                                <td class="text-left">{[vehicle.number_plate.slice(0, 2), ' - ', vehicle.number_plate.slice(2, 4), ' - ', vehicle.number_plate.slice(4)].join('')}</td>
                            </tr>
                        )}


{this.state.vehicles.map(vehicle =>
                            <tr>
                                <td class="text-left">{vehicle.vehicleID}</td>
                                <td class="text-left">{[vehicle.number_plate.slice(0, 2), ' - ', vehicle.number_plate.slice(2, 4), ' - ', vehicle.number_plate.slice(4)].join('')}</td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </div>
        );
    }

}