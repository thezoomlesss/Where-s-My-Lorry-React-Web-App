import React, { Component } from 'react';
import './../css/App.css';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import { Bar as BarChart } from 'react-chartjs-2';

const dataLabels = [];
const dataValues = [];
export default class ChartVehicleOrigin extends Component {
    constructor(props) {
        super(props);

        this.props.vehData.forEach(element => {
            dataLabels.push(element['country_origin']);
            dataValues.push(element['number']);
        });
        // var dataLabels = this.props.vehData[0]['brand_name'];
        // console.log(dataLabels);
        const data = {
            labels: dataLabels,
            datasets: [{

                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(255, 132, 203, 0.5)',
                    'rgba(205,133,63, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 132, 203, 1)',
                    'rgba(205, 133, 63, 1)'
                ],
                borderWidth: 1,
                data: dataValues,
            }]
        };
        const options = {
            scales: {
                xAxes: [{
                    stacked: true,
                    barPercentage: 0.35
                }],
                yAxes: [{
                    stacked: true
                }]
            },
            legend: {
                display: false,
            },
            title: {
                display: this.props.labelName,
                text: this.props.labelName
            }
        };
        this.state = {
            chartData: data,
            chartOptions: options,
        };
    }
    render() {
        const { chartData, chartOptions } = this.state;
        return (
            <Grow in={true} {...(true ? { timeout: 1700 } : {})}>
                <Paper className={"paper " + this.props.size + " " + this.props.pos}>
                    <BarChart data={chartData} options={chartOptions} width="600" height="250" />
                </Paper>
            </Grow>
        );
    }
}