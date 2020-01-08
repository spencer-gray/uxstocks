import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox/SearchBox.js';
import SplashPage from './components/SplashPage/SplashPage';
import StockContent from './components/StockContent/StockContent';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stockTicker: '',
    };

    this.getTicker = this.getTicker.bind(this);
  }

  getTicker (ticker) {
    this.setState({ stockTicker: ticker });
  }
 
  render(){
    return (
      <div className='page-container'>
        <SearchBox sendTicker={this.getTicker} />

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
