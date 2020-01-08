import React, { Component } from 'react';
import './SearchBox.css';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class SearchBox extends Component {

  constructor() {
    super();
    this.state = {
      stockTicker: '',
      tempTicker: '',
    };
  }

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
    this.setState({ stockTicker: tempTicker.toUpperCase() });
    this.props.sendTicker(this.state.stockTicker);
  }

  render(){
      return (
          <div className="searchBox">
            <input type="text" name="ticker" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown} placeholder='Enter Stock Ticker...' autoComplete="off" spellCheck="false"/>
          </div>
      );
  }
}

export default SearchBox
