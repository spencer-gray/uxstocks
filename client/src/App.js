import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox.js';
import CompanyInfo from './components/CompanyDetails/CompanyHeader';
import Chart from './components/Chart/Chart';

//import SearchIcon from "@material-ui/icons/Search";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class App extends Component {
  constructor() {
    super();
    this.state = {
      stockTicker: '',
      chartData: {},
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
      }
    };
  }

  // state = {
  //   stockTicker: '',
  //   chartData: {}
  // };

  timer = null

  componentDidMount() {
    fetch('api/v1/stock/goos/book')
        .then(res => res.json())
        .then(stockBook => this.setState({stockBook}))
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
    console.log(this.state.chartData);
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
            <Chart chartData={this.state.chartData} location="Massachusetts" legendPosition="bottom" stockBook={this.state.stockBook} />
          </div>
        </div>
      </div>
        
    );
  }
}

export default App
