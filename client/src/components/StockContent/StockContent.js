import React, { Component } from 'react';
import './StockContent.css';
import CompanyInfo from '../CompanyDetails/CompanyHeader';
import Chart from '../Chart/Chart';
import EPSRevChart from '../EPSRevChart/EPSRevChart';
import StockPriceHistory from '../StockPriceHistory/StockPriceHistory';
import News from '../News/News';
import IncomeStatement from '../IncomeStatement/IncomeStatement';
import { dateToQuarter } from '../../helper/helper'
import Ratings from '../Ratings/Ratings';
import PlaceholderImage from '../PlaceholderImage/PlaceholderImage';
import NotFound from '../NotFound/NotFound';

class StockContent extends Component {
  constructor() {
    super();
    this.state = {
      stockTicker: '',
      financialChartData: {},
      newsData: [],
      yearlyIncomeStatementData: {},
      keyStats: {},
      ratings: {},
      isLoading: true,
      successfullLoad: false,
      successfullLoadIncomeState: false,
      ratingLoaded: false,
      stockBookLoaded: false,
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
      .then(res => {
        if(res.status === 404) {
            this.setState({stockBookLoaded: false})
        }
        else {
          res.json()
            .then(stockBook => this.setState({
              stockBook: stockBook,
              stockBookLoaded: true
            }))
        }
      })

    // fetching news data
    fetch(`api/v1/stock/${this.props.stockTicker}/news`)
      .then(res => res.json())
      .then(newsData => this.setState({newsData}))
      .catch( err => {
        console.log(err);
        this.setState({stockBookLoaded: false})
      })

    // fetching income statement dat
    fetch(`api/v1/stock/${this.props.stockTicker}/financial/income-statement/yearly`)
    .then(res => res.json())
    .then(yearlyIncomeStatementData => this.setState({
      yearlyIncomeStatementData: yearlyIncomeStatementData,
      successfullLoadIncomeState: true,
    }))
    .catch( err => {
      console.log(err);
      this.setState({stockBookLoaded: false})
    })
    
    // fetching quarterly income statement data
    fetch(`api/v1/stock/${this.props.stockTicker}/financial/income-statement/quarterly`)
      .then(res => res.json())
      .then(result => this.setState({
        financialChartData: this.setFinancialChartData(
          result.slice(0, 4).map(item => (dateToQuarter(item.date))), 
          result.slice(0, 4).map(item => (item.EPS)),
          result.slice(0, 4).map(item => ((item["Revenue Growth"]*100).toFixed(2))),
        ),
        successfullLoad: true,
        isLoading: false
        }))
      .catch( err => {
        this.setState({
          isLoading: false,
          stockBookLoaded: false
        });
        console.log(err);
      })

    // fetching rating data
    fetch(`api/v1/stock/${this.props.stockTicker}/company/rating`)
      .then(res => res.json())
      .then(ratings => this.setState({
        ratings: ratings[0],
        ratingLoaded: true,
      }))
      .catch( err => {
        this.setState({
          ratingLoaded: false,
          stockBookLoaded: false
        });
        console.log(err);
      })
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.stockTicker !== prevProps.stockTicker) {
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
      // Checking for valid data, otherwise prompt user
      this.state.stockBookLoaded ? (
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
            <div className='content row3'>
              {this.state.successfullLoad ? (
                  <PlaceholderImage />
                ) : null}
              {this.state.ratingLoaded ? (
                  <Ratings ratings={this.state.ratings}/>
                ) : null}
              {this.state.successfullLoadIncomeState ? (
                  <IncomeStatement yearlyIncomeStatementData={this.state.yearlyIncomeStatementData} keyStats={this.state.keyStats}/>
                ) : null}
            </div>
          </div>
        </div>
        ) : (
            this.state.isLoading ? null :
            <NotFound stockTicker={this.props.stockTicker}/>  // else
          )   
    );
  }
}

export default StockContent
