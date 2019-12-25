import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox.js';
import CompanyInfo from './components/CompanyDetails/CompanyHeader';
//import SearchIcon from "@material-ui/icons/Search";

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class App extends Component {
  state = {
    stockTicker: ''
  };

  timer = null

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

  render(){
      return (
        <div>
          <SearchBox 
            stockTicker={this.state.stockTicker}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <div className="row1">
            <CompanyInfo />
          </div>
        </div>
          
      );
  }
}

export default App
