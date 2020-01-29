import React, { Component } from 'react';
import './SearchBox.css';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class SearchBox extends Component {

  constructor() {
    super();
    this.state = {
      stockTicker: '',
    };
  }

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
      this.setState({ stockTicker: e.target.value });
      this.triggerChange()
    }
  }

  // executes search
  triggerChange = () => {
    this.props.sendTicker(this.state.stockTicker.toUpperCase());   // sending stockTicker to parent component
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
