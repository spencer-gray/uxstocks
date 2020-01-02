import React, { Component } from 'react';
import './NotFound.css';

class NotFound extends Component {

  state = {
    imageLoaded: false
  }

  componentDidMount() {
    const img = new Image();
    img.src = process.env.PUBLIC_URL + '/thinking_emoji.png';
    
    img.onload = () => {
      this.setState({ imageLoaded: true });
    }
  }

  render(){
    return (
      this.state.imageLoaded ? (
        <div className='not-found'>
          <div className='not-found-content'>
            <img src={process.env.PUBLIC_URL + '/thinking_emoji.png'} alt="not found"/>
            <h1>{this.props.stockTicker}</h1>
          </div>
        </div>
      ) : null  
    );
  }
}

export default NotFound
