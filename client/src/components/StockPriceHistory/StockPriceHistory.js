import React, { Component } from 'react';
import './StockPriceHistory.css'
import { formatLargeToShortForm, formatNumber} from '../../helper/helper.js';  

class StockPriceHistory extends Component {

    state = {
        historyData: [],
    }

    componentDidMount() {
        fetch(`api/v1/stock/${this.props.stockTicker}/stats`)
            .then(res => res.json())
            .then(historyData => this.setState({historyData}))
    }

    render(){
        return (
            <div className='card card-historyInfo'>
                <div className='HistoryInfo'>
                            <div className='history-header'>
                                <p id='title'>Stock Price History</p>
                            </div>
                            <div className="history-details">
                                <div className="history-row">
                                    <p className="history-details-head">Beta</p>
                                    <p className="history-details-data">{parseFloat(this.state.historyData.beta).toFixed(2)}</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">52 Week High</p>
                                    <p className="history-details-data">${this.state.historyData.week52high}</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">52 Week Low</p>
                                    <p className="history-details-data">${this.state.historyData.week52low}</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">3 Month Change</p>
                                    <p className="history-details-data">{parseFloat(this.state.historyData.month3ChangePercent*100).toFixed(2)}%</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">6 Month Change</p>
                                    <p className="history-details-data">{parseFloat(this.state.historyData.month6ChangePercent*100).toFixed(2)}%</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">1 Year Change</p>
                                    <p className="history-details-data">{parseFloat(this.state.historyData.year1ChangePercent*100).toFixed(2)}%</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">50 Day Moving Average</p>
                                    <p className="history-details-data">${formatNumber(this.state.historyData.day50MovingAvg)}</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">200 Day Moving Average</p>
                                    <p className="history-details-data">${this.state.historyData.day200MovingAvg}</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">Average 30 Day Volume</p>
                                    <p className="history-details-data">{this.state.historyData.avg30Volume}</p>
                                </div>
                                <div className="history-row">
                                    <p className="history-details-head">Market Capitalization</p>
                                    <p className="history-details-data">${formatLargeToShortForm(this.state.historyData.marketcap).toString()}</p>
                                </div>
                            </div>
                </div>
            </div>
        );
    }
}

export default StockPriceHistory;
