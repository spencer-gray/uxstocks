import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox.js';
import SplashPage from './components/SplashPage/SplashPage';
import StockContent from './components/StockContent/StockContent';

//import SearchIcon from "@material-ui/icons/Search";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class App extends Component {
  constructor() {
    super();
    this.state = {
      stockTicker: '',
      tempTicker: '',
    };
  }

  // state = {
  //   stockTicker: '',
  //   chartData: {}
  // };

  timer = null

  // searches when user is done typing (wait-time determined by WAIT_INTERVAL)
  handleChange = e => {
    clearTimeout(this.timer)
    this.setState({ tempTicker: e.target.value });
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
    const { tempTicker } = this.state
    //console.log(stockTicker.toUpperCase());
    this.setState({ stockTicker: tempTicker.toUpperCase() });
    console.log(this.state.stockTicker);
  }

  render(){
    return (
      <div className='page-container'>
        <SearchBox 
          stockTicker={this.state.stockTicker}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />

        {(this.state.stockTicker === '') ? (
          <SplashPage />
        ) : (
          <StockContent stockTicker={this.state.stockTicker}/>
        )}

        <div className="footer">
          <p>Created by <a href='https://github.com/spencer-gray' target="_blank" rel="noopener noreferrer">Spencer Gray</a> &copy; 2020</p>
          <p>Data provided by <a href='https://iexcloud.io/' target="_blank" rel="noopener noreferrer">IEX Cloud</a></p>
        </div>
      </div>
        
    );
  }
}

export default App
