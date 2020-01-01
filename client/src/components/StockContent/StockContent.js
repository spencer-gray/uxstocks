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
      ratings: {
        rating: {},
        ratingDetails: {
          'P/B': {},
          'ROA': {},
          'DCF': {},
          'P/E': {},
          'ROE': {},
          'D/E': {}
        }
      },
      isLoading: true,
      successfullLoad: false,
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
        isLoading: false
        }))
      .catch( err => {
        this.setState({isLoading: false});
        console.log(err);
      })

    // fetching yearly keys statistics
    fetch(`api/v1/stock/${this.props.stockTicker}/financial/key-stats`)
      .then(res => res.json())
      .then(keyStats => this.setState({keyStats}))
      .catch( err => {
        // Rating data not found
        //console.log(err);
      })

    // fetching rating data
    fetch(`api/v1/stock/${this.props.stockTicker}/company/rating`)
      .then(res => {
        if(!res.ok) {
          // reset rating data ()
          this.setState({
            ratingLoaded: false,
            ratings: {
              rating: {},
              ratingDetails: {
                'P/B': {},
                'ROA': {},
                'DCF': {},
                'P/E': {},
                'ROE': {},
                'D/E': {}
              }
            }
          })
          throw new Error(res.status);
        }
        else return res.json();
      })
      .then(ratings => this.setState({
        ratings: ratings,
        ratingLoaded: true
      }))
      .catch( err => {
          // Rating data not found
          //console.log(err);
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
      // setup if conditional here, if main data doesn't get loaded, display stock not found page...
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
            <div className='content'>
              {this.state.ratingLoaded ? (
                  <Ratings ratings={this.state.ratings}/>
                ) : null}
              {this.state.successfullLoad ? (
                  <PlaceholderImage />
                ) : null}
              {this.state.successfullLoad ? (
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
