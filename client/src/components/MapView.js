import React, { Component } from 'react';
import './../css/App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import Paper from '@material-ui/core/Paper';

export class MapContainer extends Component {
    fetchVehicleLocation() {
        // console.log("Fetching...");
        // if the state hasn't been set before (no previous fetch executed and succeeded)
        if (this.state.vehiclePos != null) {
            // Not the second fetch either
            if (this.state.previousVehiclePos != null) {
                // Calculating the length of both json objects
                var count = Object.keys(this.state.vehiclePos).length;
                var previousCount = Object.keys(this.state.previousVehiclePos).length;
                if (count === previousCount) {
                    // console.log("Equal " + count);
                    for (var i = 0; i < count; i++) {
                        if (this.state.vehiclePos[i]['latitude'] !== this.state.previousVehiclePos[i]['latitude'] ||
                            this.state.vehiclePos[i]['longitude'] !== this.state.previousVehiclePos[i]['longitude']) {
                            //    console.log("YES, DIFFERENT"); 
                        }
                    }
                } else {
                    // console.log("Not Equal " + count);
                }
            }

            // this.setState({ vehiclePos: data });
            // this.state.previousVehiclePos = this.state.vehiclePos;
            // console.log(this.state.previousVehiclePos);
        }

        fetch('/vehiclesPosition?cid=1')
            .then(res => res.json())
            .then(data => {
                // console.log(data[0]);
                // console.log(data[0]['vehicleID']);
                this.setState({ vehiclePos: data });
            }).then(function () {

            });

        // .then(vehiclesPosition => this.setState({ vehiclesPos:vehiclesPosition }));
    }
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };
    constructor(props) {
        super(props);
        this.state = {
            vehiclePos: null,
            previousVehiclePos: null,
            MapViewHeight: 0
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
    }
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    componentDidMount() {
        this.fetchVehicleLocation();
        // this.interval = setInterval(() => {
        //     this.fetchVehicleLocation();
        // }, 5000);
    }
    render() {
        // const { vehiclePos } = this.state;
        return (
            <Paper className="paper">
                <div className="MapContainer" >
                    {/* {console.log(vehiclePos)} */}
                    <Map google={this.props.google} zoom={12} center={{ lat: 50.5202338, lng: 16.9446649 }} >
                        {this.state && this.state.vehiclePos && this.state.vehiclePos.map(item =>
                            <Marker key={item.vehicleID}
                                onClick={this.onMarkerClick}
                                title={item.vehicleID}
                                position={{ lat: item.latitude, lng: item.longitude }}
                            />
                            // <li key={item.vehicleID}>{item.latitude}</li>
                        )}
                        {/* <Marker onClick={this.onMarkerClick}
                        name={'Current location'} /> */}

                        <InfoWindow onClose={this.onInfoWindowClose}>
                            <div>
                                {/* <h1>{this.state.selectedPlace.name}</h1> */}
                            </div>
                        </InfoWindow>
                    </Map>
                </div>
            </Paper>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBZKmkFcM3yHWlVrltD3ixBMawuJZGrCRk')
})(MapContainer)