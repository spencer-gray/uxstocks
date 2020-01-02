import React, { Component } from 'react';
import './SearchBox.css';

class SearchBox extends Component {

  render(){
      return (
          <div className="searchBox">
            <input type="text" name="ticker" value={this.props.value} onChange={this.props.onChange} onKeyDown={this.props.onKeyDown} placeholder='Enter Stock Ticker...' autoComplete="off"/>
          </div>
      );
  }
}

export default SearchBox
