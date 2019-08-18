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
    scale = 1.6;
} else {
    scale = 1.5;
}

class TransportChart extends Component {
    constructor() {
        super();
        this.state = {
            transportsState: null
        };
    }



    componentDidMount() {
        fetch('/getYearlyGoal/progress2?cid=1')
            .then(res => res.json())
            .then(data => {
                data.map((row, index) => (
                    console.log(row['state_value'] + ' ' + row['COUNT(*)'])
                ))
                // console.log(data[0]);
                // console.log(data[0]['vehicleID']);
                // this.setState({ vehiclePos: data });
                let labels=[];
                let data_val = [];
                data.map((row, index) => (
                    labels.push(row['state_value'])
                ));
                data.map((row, index) => (
                    data_val.push(row['COUNT(*)'])
                ))

                this.setState({
                    transportsState:
                    {
                        labels: labels,
                        datasets: [{
                            data: data_val,
                            backgroundColor: [
                                '#1B9CD6',
                                'rgb(123, 211, 110)',
                                '#f76565'
                            ],
                            hoverBackgroundColor: [
                                '#27b8f9',
                                '#6fea5d',
                                '#e53030'
                            ]
                        }],
                        // // available / total
                        // text: data[0]['Active'] + '/' + (data[0]['Active'] + data[0]['Inactive'])
                    }
                });
            }).then(function () {

            });
    }
    componentDidUpdate() {

    }
    render() {
        if (!this.state.transportsState) { return null }
        else {
            return (

                <div className="chartContainer">
                    <Grow in={true}  {...(true ? { timeout: 1700 } : {})}>
                        <Paper className="paper" >
                            <Doughnut
                                data={this.state.transportsState}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    layout: {
                                        padding: {
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0
                                        }
                                    },
                                    legend: {
                                        reverse: true
                                    },
                                    title: {
                                        display: "All Time Transport Overview",
                                        text: "All Time Transport Overview"
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
export default TransportChart;