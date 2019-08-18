import React, { Component } from 'react';
import './../css/App.css';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

export class MapContainer extends Component {
    
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
            selectedPlace: 0,
            activeMarker: null,
            showingInfoWindow: false,
            MapViewHeight: 0
        };
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.fetchVehicleLocation = this.fetchVehicleLocation.bind(this);
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
    shouldComponentUpdate(nextProps,nextState) {
        return (this.state.vehiclePos !== nextState.vehiclePos );
    }
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
    render() {
        // const { vehiclePos } = this.state;
        return (
            <Fade in={true} {...(true ? { timeout: 1700 } : {})}>
                <Paper className="paper mapPaper">
                    {/* {this.state && this.state.showingInfoWindow ?"Yes":"No"} */}
                    <div className="MapContainer" >
                        {/* {console.log(vehiclePos)} */}
                        <Map className="mapGoogle" google={this.props.google} zoom={4} center={{ lat: 38.5202338, lng: 16.9446649 }} >
                            {this.state && this.state.vehiclePos && this.state.vehiclePos.map(item =>
                                <Marker key={item.vehicleID}
                                    name={'Current location'}
                                    onClick={this.onMarkerClick}
                                    // title={item.vehicleID}
                                    position={{ lat: item.latitude, lng: item.longitude }}
                                    options={{icon: 'https://img.icons8.com/office/30/000000/interstate-truck.png'}}
                                >{ this.state && this.state.showingInfoWindow ?(
                                    <InfoWindow position={this.state.activeMarker.position} >
                                        <span>TEST</span>
                                    </InfoWindow>):false}
                                </Marker>
                                // <li key={item.vehicleID}>{item.latitude}</li>
                            )}
                            
                            
                            
                        </Map>
                    </div>
                </Paper>
            </Fade>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyBZKmkFcM3yHWlVrltD3ixBMawuJZGrCRk')
})(MapContainer)