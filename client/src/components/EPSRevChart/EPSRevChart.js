import React, { Component } from 'react';
import './EPSRevChart.css'
import { Line } from 'react-chartjs-2';

class EPSRevChart extends Component {
    render(){
        return (
            <div className='card card-financialChart'>
                <div className='FinancialChart'>
                        <div className='financialChart-header'>
                            <p id='title'>EPS / Revenue Growth</p>
                        </div>
                        <Line 
                            data={this.props.financialChartData} 
                            height={250}
                            options={{
                                title:{
                                    display: false,
                                },
                                legend:{
                                    display: false,
                                },
                                scales: {
                                    xAxes: [{
                                        gridLines: {
                                            display: false ,
                                        },
                                    }],
                                    yAxes: [{
                                        gridLines: {
                                            display: false ,
                                        },
                                    }]
                                },
                            }}
                        />
                </div>
            </div>
        );
    }
}

export default EPSRevChart;
