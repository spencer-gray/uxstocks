import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Ratings.css'
import Rating from '@material-ui/lab/Rating';
import { withStyles } from '@material-ui/core/styles';

const StyledRating = withStyles({
    iconFilled: {color: '#dbd8e3'},
})(Rating);
  
class Recommendation extends Component {

    render(){
        return (
            <div className='card card-rating'>
                <div className='rating'>
                    <div className='rating-header'>
                        <p id='title'>Ratings</p>
                    </div>
                    <div className='rating-content'>
                        <div className='rating-summary'>
                                <StyledRating value={parseFloat(this.props.ratings.ratingScore)} readOnly precision={0.5}/>
                            <p>{this.props.ratings.rating}</p>
                        </div>
                        <div className='rating-details'>
                            {/* json api data not structured in array format, resorting to hardcoding */}
                            <div className='rating-details-item'>
                                <div className='item'>
                                    <div id='rating-detail-header'>P/B:</div>
                                    <StyledRating value={this.props.ratings.ratingDetailsPBScore} readOnly precision={0.5} size="small"/>
                                </div>
                            </div>
                            <div className='rating-details-item'>
                                <div className='item'>
                                    <div id='rating-detail-header'>ROA:</div>
                                    <StyledRating value={parseFloat(this.props.ratings.ratingDetailsROAScore)} readOnly precision={0.5} size="small"/>
                                </div>
                            </div>
                            <div className='rating-details-item'>
                                <div className='item'>
                                    <div id='rating-detail-header'>DCF:</div>
                                    <StyledRating value={this.props.ratings.ratingDetailsDCFScore} readOnly precision={0.5} size="small"/>
                                </div>
                            </div>
                            <div className='rating-details-item'>
                                <div className='item'>
                                    <div id='rating-detail-header'>P/E:</div>
                                    <StyledRating value={this.props.ratings.ratingDetailsPEScore} readOnly precision={0.5} size="small"/>
                                </div>
                            </div>
                            <div className='rating-details-item'>
                                <div className='item'>
                                    <div id='rating-detail-header'>ROE:</div>
                                    <StyledRating value={this.props.ratings.ratingDetailsROAScore} readOnly precision={0.5} size="small"/>
                                </div>
                            </div>
                            <div className='rating-details-item'>
                                <div className='item'>
                                    <div id='rating-detail-header'>D/E:</div>
                                    <StyledRating value={this.props.ratings.ratingDetailsDEScore} readOnly precision={0.5} size="small"/>
                                </div>
                            </div>

                            <div className="rating-footer">
                                <small>Recommendation: {this.props.ratings.ratingRecommendation}</small>
                            </div>
                        </div>
                    </div>   
                </div>
            </div>
        );
    }
}

export default Recommendation;
