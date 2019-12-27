import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import './Chart.css'
import { ButtonGroup, Button } from '@material-ui/core'
import { formatNumber } from '../../helper/helper.js';


class Chart extends Component{

    state = {
        chartData: {},
        timeDate: new Date().getHours()+":"+new Date().getMinutes()+':'+new Date().getSeconds(),
        tempData: [],
        tempDates: [],
        stockBook: {},
    }

    static defaultProps = {
        displayTitle:false,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
    }

    componentDidMount() {
        fetch('api/v1/stock/goos/chart/1m?chartCloseOnly=true')
            .then(res => res.json())
            .then(result => this.setState({
                tempData: result,
                // tempDates: result.map(item => (item.label)),
                // tempChartValues: result.map(item => (item.close)),
                chartData: this.setChartData(result.map(item => (item.date)), result.map(item => (item.close)))
            }))
    }

    loadNewData(period) {
        fetch(`api/v1/stock/goos/chart/${period}?chartCloseOnly=true`)
            .then(res => res.json())
            .then(result => this.setState({
                tempData: result,
                chartData: this.setChartData(result.map(item => (item.date)), result.map(item => (item.close)))
            }))
            .then(this.render());
    }

    setChartData(dates, data){
        return {
            // labels will be the dates
            labels: dates,
            datasets:[
                {
                label:'Closing Price Per Share in USD',
                data: data,
                fill: false,
                backgroundColor: "#ffffff",
                pointBorderColor: "#55bae7",
                borderColor: "#ffffff",
                }
            ],
        }
    }

    render() {
        return (
            <div className='card card-chart'>
                <div className='chart-header'>
                    <div className='price'>
                        <h2 className='price-header'>${this.props.stockBook.quote.latestPrice}</h2>
                        <p>
                            <span className='item-name'>${this.props.stockBook.quote.change}</span>
                            <span className='item-name'>{parseFloat(this.props.stockBook.quote.changePercent*100).toFixed(2)}%</span>
                            <span className='item-name'>{this.state.timeDate}</span>
                        </p>
                    </div>
                    <div className='chart-buttons'>
                        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                            <Button onClick= {() => this.loadNewData('1m')}>1M</Button>
                            <Button onClick= {() => this.loadNewData('3m')}>3M</Button>
                            <Button onClick= {() => this.loadNewData('6m')}>6M</Button>
                            <Button onClick= {() => this.loadNewData('1y')}>1Y</Button>
                            <Button onClick= {() => this.loadNewData('ytd')}>YTD</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className='chart'>
                    <Line
                        data={this.state.chartData}
                        options={{
                            title:{
                                // display: this.props.displayTitle,
                                display: false,
                                text:'Largest Cities In ' + this.props.location,
                                fontSize:25
                            },
                            legend:{
                                display: false,
                            },
                            scales: {
                                xAxes: [{
                                    ticks: {
                                        display: false
                                    },
                                    gridLines: {
                                        display: false ,
                                    },
                                }],
                                yAxes: [{
                                    ticks: {
                                        display: false
                                    },
                                    gridLines: {
                                        display: false ,
                                    },
                                }]
                            },
                            tooltips: {
                                intersect: false,
                            },
                            elements: {
                                point:{
                                    radius: 0
                                }
                            },
                        }}
                    />
                </div>
                <div className='chart-footer'>
                    <p>
                        <span className='item-name'>Volume</span>
                        <span className='item-value'>{formatNumber(this.props.stockBook.quote.latestVolume)}</span>
                    </p>
                    <p>
                        <span className='item-name'>PE Ratio</span>
                        <span className='item-value'>{this.props.stockBook.quote.peRatio}</span>
                    </p>
                    <p>
                        <span className='item-name'>High</span>
                        <span className='item-value'>${this.props.stockBook.quote.high}</span>
                    </p>
                    <p>
                        <span className='item-name'>Low</span>
                        <span className='item-value'>${this.props.stockBook.quote.low}</span>
                    </p>               
                </div>
            </div>
        )
    }
}

export default Chart;
