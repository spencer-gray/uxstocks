import React, { Component } from 'react';
import '../../App.css';
import CompanyInfo from '../CompanyDetails/CompanyHeader';
import Chart from '../Chart/Chart';
import EPSRevChart from '../EPSRevChart/EPSRevChart';
import StockPriceHistory from '../StockPriceHistory/StockPriceHistory';
import { dateToQuarter } from '../../helper/helper'

class StockContent extends Component {
  constructor() {
    super();
    this.state = {
      stockTicker: '',
      financialChartData: {},
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

  componentDidMount() {
    fetch(`api/v1/stock/${this.props.stockTicker}/book`)
      .then(res => res.json())
      .then(stockBook => this.setState({stockBook}))
    
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
          </div>
        </div>
      </div>
        
    );
  }
}

export default StockContent
