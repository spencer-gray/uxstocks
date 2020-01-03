import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './News.css'
  
class News extends Component {
    render(){
        return (
            <div className='card card-news'>
                <div className='news'>
                    <div className='news-header'>
                        <p id='title'>News Feed</p>
                    </div>
                    <div className='news-content'>
                    <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false} showIndicators={false} interval={7000} transitionTime={2000}>
                        {this.props.newsData.map( (data, i) =>
                            <a className='news-link' key={i} href={data.url}>
                                <div className='news-item'>
                                    <div className="news-description">
                                        <p>{data.headline}</p>
                                    </div>
                                    <div className="news-source">
                                        <p>Source: {data.source}</p> 
                                    </div>
                                </div>    
                            </a>
                        )}
                    </Carousel>
                    </div>   
                </div>
            </div>
        );
    }
}

export default News;
