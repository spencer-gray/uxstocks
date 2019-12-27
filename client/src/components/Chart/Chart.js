import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import './Chart.css'
import { ButtonGroup, Button } from '@material-ui/core'
import { formatNumber, formatDate, addMonths, findSum } from '../../helper/helper.js';


class Chart extends Component{

    currentDate = new Date();
    prevMonth = addMonths(new Date(), -1)

    state = {
        chartData: {},
        timeDate: this.currentDate.getHours()+":"+this.currentDate.getMinutes()+':'+this.currentDate.getSeconds(),
        tempData: [],
        tempDates: [],
        stockBook: {},
        closeArr: [],
        volumeArr: [],
        chartLow: null,
        chartHigh: null,
        chartSum: null,
        chartStartDate: formatDate(this.prevMonth),
        chartEndDate: formatDate(this.currentDate),
    }

    static defaultProps = {
        displayTitle:false,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
    }

    componentDidMount() {
        fetch(`api/v1/stock/aapl/chart2/${this.state.chartStartDate}/${this.state.chartEndDate}`)
            .then(res => res.json())
            .then(result => this.setState({
                tempData: result,
                // tempDates: result.map(item => (item.label)),
                // tempChartValues: result.map(item => (item.close)),
                volumeArr: result.map(item => (item.volume)),
                chartLow: Math.min.apply(null, result.map(item => (item.close))),
                chartHigh: Math.max.apply(null, result.map(item => (item.close))),
                //chartSum: this.state.volumeArr.reduce((a, b) => a + b, 0),         // summing values in volumeArr
                chartSum: findSum(this.state.volumeArr),
                chartData: this.setChartData(result.map(item => (item.date.slice(0, 10))), result.map(item => (item.close)))
                //item.date.slice(0, 10)
            }))
    }

    loadNewData(start, end) {
        fetch(`api/v1/stock/aapl/chart2/${start}/${end}`)
            .then(res => res.json())
            .then(result => this.setState({
                tempData: result,
                volumeArr: result.map(item => (item.volume)),
                chartLow: Math.min.apply(null, result.map(item => (item.close))),
                chartHigh: Math.max.apply(null, result.map(item => (item.close))),
                //chartSum: this.state.volumeArr.reduce((a, b) => a + b, 0),         // summing values in volumeArr
                chartSum: findSum(this.state.volumeArr),
                chartData: this.setChartData(result.map(item => (item.date.slice(0, 10))), result.map(item => (item.close)))
            }))
            .then(this.render());
    }

    // temp dataset used during development
    // componentDidMount() {
    //     fetch('temp1MData.json')
    //         .then(res => res.json())
    //         .then(result => this.setState({
    //             tempData: result,
    //             // tempDates: result.map(item => (item.label)),
    //             // tempChartValues: result.map(item => (item.close)),
    //             volumeArr: result.map(item => (item.volume)),
    //             chartLow: Math.min.apply(null, result.map(item => (item.close))),
    //             chartHigh: Math.max.apply(null, result.map(item => (item.close))),
    //             //chartSum: this.state.volumeArr.reduce((a, b) => a + b, 0),         // summing values in volumeArr
    //             chartSum: findSum(this.state.volumeArr),
    //             chartData: this.setChartData(result.map(item => (item.date)), result.map(item => (item.close)))
    //         }))
    // }

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
                            <Button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -1)), this.state.chartEndDate)}>1M</Button>
                            <Button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -3)), this.state.chartEndDate)}>3M</Button>
                            <Button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -6)), this.state.chartEndDate)}>6M</Button>
                            <Button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -12)), this.state.chartEndDate)}>1Y</Button>
                            {/* <Button onClick= {() => this.loadNewData(formatDate(addMonths(this.currentDate, -1)), this.state.chartEndDate)}>YTD</Button> */}
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
                        <span className='item-value'>{formatNumber(findSum(this.state.volumeArr))}</span>
                    </p>
                    <p>
                        <span className='item-name'>PE Ratio</span>
                        <span className='item-value'>{this.props.stockBook.quote.peRatio}</span>
                    </p>
                    <p>
                        <span className='item-name'>High</span>
                        <span className='item-value'>${this.state.chartHigh}</span>
                    </p>
                    <p>
                        <span className='item-name'>Low</span>
                        <span className='item-value'>${this.state.chartLow}</span>
                    </p>               
                </div>
            </div>
        )
    }
}

export default Chart;
