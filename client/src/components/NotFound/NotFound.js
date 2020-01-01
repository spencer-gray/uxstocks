import React, { Component } from 'react';
import './NotFound.css';

class NotFound extends Component {

  render(){
    return (
      <div className='not-found'>
        <div className='not-found-content'>
            <img src={process.env.PUBLIC_URL + '/thinking_emoji.png'} alt="not found"/>
            <h1>{this.props.stockTicker}</h1>
        </div>
      </div>  
    );
  }
}

export default NotFound
