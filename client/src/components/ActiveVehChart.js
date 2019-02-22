import React, { Component } from 'react';
import './../css/App.css';
import { Doughnut, Chart } from 'react-chartjs-2';


// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
  draw: function() {
    originalDoughnutDraw.apply(this, arguments);
    
    var chart = this.chart.chart;
    var ctx = chart.ctx;
    var width = chart.width;
    var height = chart.height;

    var fontSize = (height / 124).toFixed(2); // original value 114
    ctx.font = fontSize + "em Verdana";
    ctx.textBaseline = "middle";

    var text = chart.config.data.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 1.8; //original value 2

    ctx.fillText(text, textX, textY);
  }
});
export default class ActiveVehChart extends Component {
    constructor() {
        super();
        this.state = {
            vehicleState : null
        };
        this.getState = this.getState.bind(this);
    }
    getState = () => ({
        
        labels: [
            'Not Active',
            'Active'
        ],
        datasets: [{
            data: [5, 12],
            backgroundColor: [
                '#D9D9D9',
                '#1B9CD6'
            ],
            hoverBackgroundColor: [
                '#D9D9D9',
                '#FF6384'
                
            ]
        }],
        text: '12/18'
    });

    componentDidMount() {
        fetch('/getActiveVehicles/count?cid=1')
            .then(res => res.json())
            .then(data => {
                // console.log(data[0]);
                // console.log(data[0]['vehicleID']);
                // this.setState({ vehiclePos: data });
                this.setState({vehicleState : 
                    {
                        labels: [
                            'Not Active',
                            'Active'
                        ],
                        datasets: [{
                            // active & not active
                            data: [ data[1]['count_state'], data[0]['count_state'] ],
                            backgroundColor: [
                                '#D9D9D9',
                                '#1B9CD6'
                            ],
                            hoverBackgroundColor: [
                                '#D9D9D9',
                                '#FF6384'
                                
                            ]
                        }],
                        // available / total
                        text: data[0]['count_state'] + '/' + (data[0]['count_state'] + data[1]['count_state']) 
                    }
                });
            }).then(function () {

            });
    }
    componentDidUpdate(){
        
    }
    render() {
        if(!this.state.vehicleState){return null}
        else {
            return (
                <div>
                    <div style={{width:'600px'}}>
                        <Doughnut
                            data={this.state.vehicleState}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                            }}
                        />
                        {/* {this.state.vehiclePos ? <Doughnut data={this.state.vehicleState} options={{responsive: true, maintainAspectRatio: true}} /> : null} */}
                    </div>
                </div>
            );
        }
        
    }
}
