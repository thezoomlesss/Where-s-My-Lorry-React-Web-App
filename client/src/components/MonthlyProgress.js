import React, { Component } from 'react';
import './../css/App.css';
import { Doughnut, Chart } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

// some of this code is a variation on https://jsfiddle.net/cmyker/u6rr5moq/
var originalDoughnutDraw = Chart.controllers.doughnut.prototype.draw;
const vHeight = window.innerHeight;
// var scale = 1.4;

// // Depending on the height of the viewPort, we decide what scale we should use for our numbers inside the chart
// if (vHeight > 700) {
//     scale = 1.8;
// } else {
//     scale = 1.7;
// }
// Chart.helpers.extend(Chart.controllers.doughnut.prototype, {
//     draw: function () {
//         originalDoughnutDraw.apply(this, arguments);
//         var chart = this.chart.chart;
//         var ctx = chart.ctx;
//         var width = chart.width;
//         var height = chart.height;

//         var fontSize = (height / 124).toFixed(2); // original value 114
//         ctx.font = fontSize + "em Verdana";
//         ctx.textBaseline = "middle";

//         var text = chart.config.data.text,
//             textX = Math.round((width - ctx.measureText(text).width) / 2),
//             textY = height / scale; //original value 2

//         ctx.fillText(text, textX, textY);
//     }
// });
class MonthlyProgress extends Component {
    constructor() {
        super();
        this.state = {
            progress: null
        };
    }
    componentDidMount() {
        fetch('/getYearlyGoal/?cid=1')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    progress:
                    {
                        labels: [
                            'Total',
                            'Achieved'
                        ],
                        datasets: [{
                            // active & not active
                            data: [(data['yearly_goal']-96)<0?0:(data['yearly_goal']-96), 96],
                            backgroundColor: [
                                '#D9D9D9',
                                '#f95454'
                            ],
                            hoverBackgroundColor: [
                                '#D9D9D9',
                                '#d83c3c'

                            ]
                        }],
                        // Achieved / total
                        text: 96 + '/' + (data['yearly_goal'])
                    },
                    progress2:
                    {
                        labels: [
                            'Total',
                            'Achieved'
                        ],
                        datasets: [{
                            // active & not active
                            data: [(Math.round(data['yearly_goal'] / 12)-18)<0?0:(Math.round(data['yearly_goal'] / 12)-18), 18],
                            backgroundColor: [
                                '#D9D9D9',
                                '#4db692'
                            ],
                            hoverBackgroundColor: [
                                '#D9D9D9',
                                '#4db675'

                            ]
                        }],
                        // Achieved / total
                        text: 18 + '/' + (Math.round(data['yearly_goal'] / 12))
                    }
                });
            });
    }
    render() {
        if (!this.state.progress) { return null }
        else {
            return (

                <div className="half-page-paper">
                    <Grow in={true}  {...(true ? { timeout: 1700 } : {})}>
                        <Paper className="paper1 half-page-paper" >
                            <Doughnut
                                data={this.state.progress2}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    cutoutPercentage: 76,
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
                                    },
                                    title: {
                                        display: 'Progress on the Monthly Goal',
                                        text: 'Progress on the Monthly Goal'
                                    }

                                }}
                            />
                        </Paper>
                    </Grow>
                    <Grow in={true}  {...(true ? { timeout: 1700 } : {})}>
                        <Paper className="paper2 half-page-paper" >
                            <Doughnut
                                data={this.state.progress}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: true,
                                    cutoutPercentage: 76,
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
                                    },
                                    title: {
                                        display: 'Progress on the Yearly Goal',
                                        text: 'Progress on the Yearly Goal'
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
export default MonthlyProgress;