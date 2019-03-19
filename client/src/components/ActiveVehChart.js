import React, { Component } from 'react';
import './../css/App.css';
import { Doughnut, Chart } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
const vHeight = window.innerHeight;
var scale = 1.4;

// Depending on the height of the viewPort, we decide what scale we should use for our numbers inside the chart
if (vHeight > 700) {
    scale = 1.8;
} else {
    scale = 1.7;
}

class ActiveVehChart extends Component {
    constructor() {
        super();
        this.state = {
            vehicleState: null
        };
        this.draw_charts = this.draw_charts.bind(this);
    }

    draw_charts() {
        Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
            draw: function () {
                originalDoughnutDraw.apply(this, arguments);

                var chart = this.chart.chart;

                var ctx = chart.ctx;
                var width = chart.width;
                var height = chart.height;

                var text = chart.config.data.text;
                var text_check = text.split('/');
                var text_total_char = text_check[0].length + text_check[1].length;
                var fontSize = 0;

                switch (text_total_char) {
                    case 2:
                        fontSize = (height / 114).toFixed(2); // original value 114
                        break;
                    case 3:
                        fontSize = (height / 124).toFixed(2); // original value 114
                        break;
                    case 4:
                        fontSize = (height / 134).toFixed(2); // original value 114
                        break;
                    case 5:
                        fontSize = (height / 160).toFixed(2); // original value 114
                        break;
                    case 6:
                        fontSize = (height / 170).toFixed(2); // original value 114
                        break;
                    default:
                        fontSize = (height / 124).toFixed(2);
                        break;
                }

                ctx.font = fontSize + "em Verdana";
                ctx.textBaseline = "middle";

                var textX = Math.round((width - ctx.measureText(text).width) / 2),
                    textY = height / scale; //original value 2

                ctx.fillText(text, textX, textY);
            }
        });
    }

    componentDidMount() {
        fetch('/getActiveVehicles/count?cid=1')
            .then(res => res.json())
            .then(data => {
                // console.log(data[0]);
                // console.log(data[0]['vehicleID']);
                // this.setState({ vehiclePos: data });
                this.setState({
                    vehicleState:
                    {
                        labels: [
                            'Not Active',
                            'Active'
                        ],
                        datasets: [{
                            // active & not active
                            data: [data[0]['Inactive'], data[0]['Active']],
                            backgroundColor: [
                                '#D9D9D9',
                                '#1B9CD6'
                            ],
                            hoverBackgroundColor: [
                                '#D9D9D9',
                                '#27b8f9'

                            ]
                        }],
                        // available / total
                        text: data[0]['Active'] + '/' + (data[0]['Active'] + data[0]['Inactive'])
                    }
                });
            }).then(function () {

            });
        this.draw_charts();
    }
    componentDidUpdate() {

    }
    render() {
        if (!this.state.vehicleState) { return null }
        else {
            return (

                <div className="chartContainer">
                    <Grow in={true}  {...(true ? { timeout: 1700 } : {})}>
                        <Paper className="paper" >
                            <Doughnut
                                data={this.state.vehicleState}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    layout: {
                                        padding: {
                                            left: 20,
                                            right: 20,
                                            top: 20,
                                            bottom: 20
                                        }
                                    },
                                    legend: {
                                        reverse: true
                                    }

                                }}
                            />
                        </Paper>
                    </Grow>

                </div>
            );
        }

    }
}

// const Home = AnimatedWrapper();
export default ActiveVehChart;