import React, { Component } from 'react';
import './SplashPage.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

class SplashPage extends Component {

  state = {
    landingData: {},
    didLoad: false,
  }

  fetchData() {
    fetch(`api/v1/stock/landing`)
      .then(res => res.json())
      .then(landingData => this.setState({
        landingData: landingData,
        didLoad: true
      }))
  }

  componentDidMount() {
    this.fetchData();
  }

  render(){
    const convertedData = [];

    // converting json arrays of json classes to arrays
    for (var item in this.state.landingData) {
      convertedData.push(this.state.landingData[item]);
    }

    return (
      this.state.didLoad ? (
        <div className='slash-screen'>
          <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} interval={3000} transitionTime={1000}>
            {convertedData.map( (data, i) =>
              <div key={i} className='landing-item'>
                <p id='symbol'>{data.quote.symbol}</p>
                <p id='splash-name'>{data.quote.companyName}</p>
                <div className="landing-values">
                  <p>${data.quote.latestPrice}</p> 
                  <p style={{color: Math.sign(data.quote.changePercent) === -1 ? "#e53935" : "#8bc34a"}}>{parseFloat(data.quote.changePercent*100).toFixed(2)}%</p>
                </div>
              </div>    
            )}
          </Carousel>
        </div>
      ) : null  
    );
  }
}

export default SplashPage
