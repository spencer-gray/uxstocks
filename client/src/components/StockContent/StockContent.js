import React, { Component } from 'react';
import './StockContent.css';
import CompanyInfo from '../CompanyDetails/CompanyHeader';
import Chart from '../Chart/Chart';
import EPSRevChart from '../EPSRevChart/EPSRevChart';
import StockPriceHistory from '../StockPriceHistory/StockPriceHistory';
import News from '../News/News';
import IncomeStatement from '../IncomeStatement/IncomeStatement';
import { dateToQuarter } from '../../helper/helper'

class StockContent extends Component {
  constructor() {
    super();
    this.state = {
      stockTicker: '',
      financialChartData: {},
      newsData: [],
      yearlyIncomeStatementData: {},
      keyStats: {},
      successfullLoad: false,
      stockBook: {
        quote: {
          high: null,
          low: null,
          latestVolume: null,
          peRatio: null,
          latestPrice: null,
          change: null,
          changePercent: null,
          marketCap: null,
          week52High: null,
          week52Low: null,
        }
      },
    };
  }

  fetchData() {
    fetch(`api/v1/stock/${this.props.stockTicker}/book`)
      .then(res => res.json())
      .then(stockBook => this.setState({stockBook}))

    // fetching news data
    fetch(`api/v1/stock/${this.props.stockTicker}/news`)
      .then(res => res.json())
      .then(newsData => this.setState({newsData}))

    // fetching yearly income statement data
    fetch(`api/v1/stock/${this.props.stockTicker}/financial/income-statement/yearly`)
      .then(res => res.json())
      .then(yearlyIncomeStatementData => this.setState({yearlyIncomeStatementData}))
      .catch( err => {
        console.log(err);
      })
    
    // fetching quarterly income statement data
    fetch(`api/v1/stock/${this.props.stockTicker}/financial/income-statement`)
      .then(res => res.json())
      .then(result => this.setState({
        financialChartData: this.setFinancialChartData(
          result.slice(0, 4).map(item => (dateToQuarter(item.date))), 
          result.slice(0, 4).map(item => (item.EPS)),
          result.slice(0, 4).map(item => ((item["Revenue Growth"]*100).toFixed(2))),
        ),
        successfullLoad: true,
      }))
      .catch( err => {
        console.log(err);
      })

    // fetching yearly keys statistics
    fetch(`api/v1/stock/${this.props.stockTicker}/financial/key-stats`)
      .then(res => res.json())
      .then(keyStats => this.setState({keyStats}))
      .catch( err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.stockTicker !== prevProps.stockTicker) {
      console.log('updated stock info...');
      this.fetchData();
    }
  }

  setFinancialChartData(dates, epsData, revData){
    return {
        labels: dates,
        datasets:[
            {
              label:'Earnings Per Share',
              data: epsData,
              fill: false,
              pointRadius: 10,
              borderColor: "#46b5d1",
              showLine: false
            },
            {
              label:'Revenue Growth (%)',
              data: revData,
              fill: false,
              pointRadius: 10,
              borderColor: "#978faa",
              showLine: false
            }
        ],
    }
}

  render(){
    return (
      <div>
        <div className="row1">
          <div className='content'>
            <CompanyInfo stockTicker={this.props.stockTicker}/>
            <Chart stockBook={this.state.stockBook} stockTicker={this.props.stockTicker}/>
          </div>
        </div>
        <div className="row2">
          <div className='content'>
            <StockPriceHistory stockTicker={this.props.stockTicker}/>
            {/* <EPSRevChart financialChartData={this.state.financialChartData}/> */}

            {/* Conditional for EPS / Rev Chart when reqd data cannot be found in api*/}
            {this.state.successfullLoad ? (
              <EPSRevChart financialChartData={this.state.financialChartData}/>
            ) : (
              void 0
            )}
            {/* Carousal component required the length to be > 0 for autoplay functionality to kick in*/}
            {(this.state.newsData.length > 0) ? (
              <News newsData={this.state.newsData}/>
            ) : null}
          </div>
        </div>
        <div className="row3">
          <div className='content'>
            {this.state.successfullLoad ? (
                <IncomeStatement yearlyIncomeStatementData={this.state.yearlyIncomeStatementData} keyStats={this.state.keyStats}/>
              ) : (
                void 0
            )}
            
          </div>
        </div>
      </div>
        
    );
  }
}

export default StockContent
