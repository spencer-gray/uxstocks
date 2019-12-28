import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import './Chart.css'
import { formatNumber, formatDate, addMonths, findSum } from '../../helper/helper.js';


class Chart extends Component{

    currentDate = new Date();
    prevMonth = addMonths(new Date(), -1)

    state = {
        chartData: {},
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
                // backgroundColor: "#dbd8e3",
                // pointBorderColor: "#55bae7",
                borderColor: "#46b5d1",
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
                            <span className='item-name'>({parseFloat(this.props.stockBook.quote.changePercent*100).toFixed(2)}%)</span>
                            <span className='item-date'>{this.props.stockBook.quote.latestTime}</span>
                        </p>
                    </div>
                    <div className='chart-buttons'>
                        <button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -1)), this.state.chartEndDate)}>1M</button>
                        <button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -3)), this.state.chartEndDate)}>3M</button>
                        <button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -6)), this.state.chartEndDate)}>6M</button>
                        <button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -12)), this.state.chartEndDate)}>1Y</button>
                        <button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -24)), this.state.chartEndDate)}>2Y</button>
                    </div>
                </div>
                <div className='chart'>
                    <Line
                        data={this.state.chartData}
                        options={{
                            title:{
                                display: false,
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
                        <span className='detail'>Volume</span>
                        <span className='detail-value'>{formatNumber(findSum(this.state.volumeArr))}</span>
                    </p>
                    <p>
                        <span className='detail'>PE Ratio</span>
                        <span className='detail-value'>{this.props.stockBook.quote.peRatio}</span>
                    </p>
                    <p>
                        <span className='detail'>High</span>
                        <span className='detail-value'>${this.state.chartHigh}</span>
                    </p>
                    <p>
                        <span className='detail'>Low</span>
                        <span className='detail-value'>${this.state.chartLow}</span>
                    </p>               
                </div>
            </div>
        )
    }
}

export default Chart;
