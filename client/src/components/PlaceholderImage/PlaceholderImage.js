import React, { Component } from 'react';
import './PlaceholderImage.css';
  
class PlaceholderImage extends Component {
    render(){
        return (
            <div className='card card-placeholder'>
                <div className='placeholder'>
                    <img src={process.env.PUBLIC_URL + '/uxstocks_placeholder.svg'} alt="placeholder"/>
                </div>
            </div>
        );
    }
}

export default PlaceholderImage;
