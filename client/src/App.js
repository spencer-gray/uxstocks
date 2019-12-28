import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox.js';
import CompanyInfo from './components/CompanyDetails/CompanyHeader';
import Chart from './components/Chart/Chart';
import EPSRevChart from './components/EPSRevChart/EPSRevChart';
import StockPriceHistory from './components/StockPriceHistory/StockPriceHistory';
import { dateToQuarter } from './helper/helper'

//import SearchIcon from "@material-ui/icons/Search";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class App extends Component {
  constructor() {
    super();
    this.state = {
      stockTicker: '',
      financialChartData: {},
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
      //financialData: []
    };
  }

  // state = {
  //   stockTicker: '',
  //   chartData: {}
  // };

  timer = null

  componentDidMount() {
    fetch('api/v1/stock/aapl/book')
      .then(res => res.json())
      .then(stockBook => this.setState({stockBook}))
    fetch('api/v1/stock/aapl/financial/income-statement')
      .then(res => res.json())
      .then(result => this.setState({
        financialChartData: this.setFinancialChartData(
          result.slice(0, 4).map(item => (dateToQuarter(item.date))), 
          result.slice(0, 4).map(item => (item.EPS)),
          result.slice(0, 4).map(item => (item["Revenue Growth"]*100)),
        ),
      }))
  }

  // searches when user is done typing (wait-time determined by WAIT_INTERVAL)
  handleChange = e => {
    clearTimeout(this.timer)
    this.setState({ stockTicker: e.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  }

  // searches when user clicks enter
  handleKeyDown = e => {
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer)
      this.triggerChange()
    }
  }

  // executes search (just logging to console for now)
  triggerChange = () => {
    const { stockTicker } = this.state
    console.log(stockTicker.toUpperCase());
  }

  setFinancialChartData(dates, epsData, revData){
    return {
        // labels will be the dates
        labels: dates,
        datasets:[
            {
              label:'Earnings Per Share',
              data: epsData,
              fill: false,
              pointRadius: 10,
              // backgroundColor: "#dbd8e3",
              // pointBorderColor: "#55bae7",
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
        <SearchBox 
          stockTicker={this.state.stockTicker}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <div className="row1">
          <div className='content'>
            <CompanyInfo />
            <Chart location="Massachusetts" legendPosition="bottom" stockBook={this.state.stockBook} />
          </div>
        </div>
        <div className="row2">
          <div className='content'>
            <StockPriceHistory />
            <EPSRevChart financialChartData={this.state.financialChartData}/>
          </div>
        </div>
      </div>
        
    );
  }
}

export default App
