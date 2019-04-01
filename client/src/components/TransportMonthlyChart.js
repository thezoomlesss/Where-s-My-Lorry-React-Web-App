import React, { Component } from 'react';
import './../css/App.css';
import { Doughnut, Chart } from 'react-chartjs-2';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';

var moment = require('moment-timezone');//  18/03/2019 13:35:42 PM

Chart.plugins.register({
	afterDraw: function(chart) {

    let data_sum = 0;
    chart.data.datasets[0].data.forEach(function(item, index, array) {
        data_sum += parseInt(item);
    }); 
    if (data_sum === 0) {
    	// No data is present
      var ctx = chart.chart.ctx;
      var width = chart.chart.width;
      var height = chart.chart.height
      chart.clear();
      
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = "16px normal 'Helvetica Nueue'";
      ctx.fillText('No data to display', width / 2, height / 2);
      ctx.restore();
      
    }
  }
});
class TransportMonthlyChart extends Component {
    constructor() {
        super();
        this.state = {
            transportsState: null
        };
    }



    componentDidMount() {
        fetch('/getYearlyGoal/progress/transports/all?cid=1')
            .then(res => res.json())
            .then(data => {
                let completed_count = 0;
                let active_count = 0;
                let inactive_count = 0;
                // moment('05-17-2018 23:40 AM', 'MM-DD-YYYY hh:mm A')
                // format('DD/MM/YYYY hh:mm:ss A')
                
                let current = moment().tz('Europe/Dublin');
                data.map((row, index) => (
                    moment(moment(row['day_val']+'/'+row['month_val']+'/'+row['year_val']+' '+row['hour_val']+':'+row['minute_val']+':'+row['second_val']+' '+row['AM_PM'], 'DD/MM/YYYY hh:mm:ss A')).isSame(new Date(), 'month')? ( 
                        row['state_value'] === "Completed"?
                        (completed_count++)
                        : row['state_value'] === "Active"? active_count++: inactive_count++
                    ) : false
                ));

                let data_val=[active_count, completed_count, inactive_count];
                let labels=[ "Active","Completed", "Inactive"];
                
                console.log(data_val);
                console.log(labels);
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
                                        display: "This Month's Transport Overview",
                                        text: "This Month's Transport Overview"
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
export default TransportMonthlyChart;