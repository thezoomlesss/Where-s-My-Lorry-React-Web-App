import React, { Component } from 'react';
import './../App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {
    fetchVehicleLocation() {
        // console.log("Fetching...");
        if (this.state.vehiclePos != null) {

            if (this.state.previousVehiclePos != null) {
                var count = Object.keys(this.state.vehiclePos).length;
                var previousCount = Object.keys(this.state.previousVehiclePos).length;
                if (count == previousCount) {
                    console.log("Equal" + count);
                } else {
                    console.log("Not Equal" + count);
                }
            }


            this.state.previousVehiclePos = this.state.vehiclePos;
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
    constructor() {
        super();
        this.state = {
            vehiclePos: null,
            previousVehiclePos: null
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
        this.interval = setInterval(() => {
            this.fetchVehicleLocation();
        }, 10000);
    }
    render() {
        const { vehiclePos } = this.state;
        return (
            <div>
                {console.log(vehiclePos)}


                <Map google={this.props.google} zoom={2}>
                    {this.state && this.state.vehiclePos && this.state.vehiclePos.map(item =>
                        <Marker
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
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBZKmkFcM3yHWlVrltD3ixBMawuJZGrCRk')
})(MapContainer)