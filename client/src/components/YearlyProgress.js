import React, { Component } from 'react';
import './../css/App.css';
import { Doughnut, Chart } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';


class YearlyProgress extends Component {
    constructor() {
        super();
        this.state = {
            progress: null
        };
    }
    componentDidMount() {
        let data_val=[];
        fetch('/getYearlyGoal/progress/?cid=1')
            .then(res => res.json())
            .then(data => {
                data.map((row, index) => (
                    row['state_value'] === "Completed"? ( data_val.push(row['yearly_goal']), data_val.push(row['COUNT(*)']) ) : false
                ));
                this.setState({
                    progress:
                    {
                        labels: [
                            'Total',
                            'Achieved'
                        ],
                        datasets: [{
                            // active & not active
                            data: [ Math.max(0, data_val[0]-data_val[1]), data_val[1] ],
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
                        text: data_val[1] + '/' + data_val[0]
                    }
                });
            });
    }
    
    render() {
        if (!this.state.progress) { return null }
        else {
            return (
                <Grow in={true}  {...(true ? { timeout: 1700 } : {})}>
                    <Paper className="paper progress" >
                        <Doughnut
                            data={this.state.progress}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                cutoutPercentage: 76,
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
                                    display: 'Progress on the Yearly Goal',
                                    text: 'Progress on the Yearly Goal'
                                }

                            }}
                        />
                    </Paper>
                </Grow>
            );
        }

    }
}

// const Home = AnimatedWrapper();
export default YearlyProgress;