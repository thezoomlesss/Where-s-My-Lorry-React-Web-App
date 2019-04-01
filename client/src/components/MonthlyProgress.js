import React, { Component } from 'react';
import './../css/App.css';
import { Doughnut, Chart } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

var moment = require('moment-timezone');//  18/03/2019 13:35:42 PM

class MonthlyProgress extends Component {
    constructor() {
        super();
        this.state = {
            progress: null
        };
    }
    componentDidMount() {
        fetch('/getYearlyGoal/progress/transports/all/?cid=1')
            .then(res => res.json())
            .then(data => {
                let data_val= 0;
                // moment('05-17-2018 23:40 AM', 'MM-DD-YYYY hh:mm A')
                // format('DD/MM/YYYY hh:mm:ss A')
                
                let current = moment().tz('Europe/Dublin');
                data.map((row, index) => (
                    row['state_value'] === "Completed"? ( 
                        moment(moment(row['day_val']+'/'+row['month_val']+'/'+row['year_val']+' '+row['hour_val']+':'+row['minute_val']+':'+row['second_val']+' '+row['AM_PM'], 'DD/MM/YYYY hh:mm:ss A')).isSame(new Date(), 'month')?
                        (data_val++)
                        : false
                    ) : false
                ));
                let data_monthly_total = Math.round(data[data.length-1]['yearly_goal']/ 12);
                console.log(data_monthly_total);
                this.setState({
                    progress2:
                    {
                        labels: [
                            'Not done',
                            'Achieved'
                        ],
                        datasets: [{
                            // active & not active
                            data: [(data_monthly_total - data_val) < 0 ? 0 : (data_monthly_total - data_val), data_val],
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
                        text: data_val + '/' + data_monthly_total
                    }
                });
            });
    }
    render() {
        if (!this.state.progress2) { return null }
        else {
            return (
                <Grow in={true}  {...(true ? { timeout: 1700 } : {})}>
                    <Paper className="paper progress" >
                        <Doughnut
                            data={this.state.progress2}
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
                                    display: 'Progress on the Monthly Goal',
                                    text: 'Progress on the Monthly Goal'
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
export default MonthlyProgress;