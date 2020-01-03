import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import './Chart.css'
import { formatNumber, formatDate, addMonths, findSum } from '../../helper/helper.js';


class Chart extends Component{

    currentDate = new Date();
    prevMonth = addMonths(new Date(), -1)

    state = {
        successfullLoad: false,
        chartData: {},
        tempDates: [],
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
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.stockTicker !== prevProps.stockTicker) {
            this.fetchData();
        }
    }

    fetchData() {
        fetch(`api/v1/stock/${this.props.stockTicker}/chart2/${this.state.chartStartDate}/${this.state.chartEndDate}`)
            .then(res => {
                if(res.status === 404) {
                    this.setState({successfullLoad: false});
                }
                else {res.json()
                    .then(result => this.setState({
                            successfullLoad: true,
                            volumeArr: result.map(item => (item.volume)),
                            chartLow: Math.min.apply(null, result.map(item => (item.close))),
                            chartHigh: Math.max.apply(null, result.map(item => (item.close))),
                            //chartSum: this.state.volumeArr.reduce((a, b) => a + b, 0),         // summing values in volumeArr
                            chartSum: findSum(this.state.volumeArr),
                            chartData: this.setChartData(result.map(item => (item.date.slice(0, 10))), result.map(item => (item.close)))
                    }))
                }
            })
    }

    loadNewData(start, end) {
        fetch(`api/v1/stock/${this.props.stockTicker}/chart2/${start}/${end}`)
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

    setChartData(dates, data){
        return {
            // labels will be the dates
            labels: dates,
            datasets:[
                {
                    label:'Closing Price Per Share in USD',
                    data: data,
                    fill: false,
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
                        <button onClick= {() => this.loadNewData(formatDate(addMonths(new Date(), -60)), this.state.chartEndDate)}>5Y</button>
                    </div>
                </div>
                <div className='chart'>
                    <Line
                        data={this.state.chartData}
                        height={280}
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
                            maintainAspectRatio: false
                        }}
                    />
                </div>
                <div className='chart-footer'>
                    <div className='chart-footer-item'>
                        <span className='detail'>Volume</span>
                        <span className='detail-value'>{formatNumber(findSum(this.state.volumeArr))}</span>
                    </div>
                    <div className='chart-footer-item'>
                        <span className='detail'>PE Ratio</span>
                        <span className='detail-value'>{this.props.stockBook.quote.peRatio}</span>
                    </div>
                    <div className='chart-footer-item'>
                        <span className='detail'>High</span>
                        <span className='detail-value'>${this.state.chartHigh}</span>
                    </div>
                    <div className='chart-footer-item'>
                        <span className='detail'>Low</span>
                        <span className='detail-value'>${this.state.chartLow}</span>
                    </div>               
                </div>
            </div>
            
        )
    }
}

export default Chart;
