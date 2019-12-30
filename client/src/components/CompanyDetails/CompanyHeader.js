import React, { Component } from 'react';
import './CompanyHeader.css'
import { getFirstAndLastWords, formatNumber, getNWords} from '../../helper/helper.js';
  
class CompanyInfo extends Component {

    state = {
        companyData: [],
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.stockTicker !== prevProps.stockTicker) {
            this.fetchData();
        }
    }

    fetchData() {
        fetch(`api/v1/stock/${this.props.stockTicker}/company`)
            .then(res => res.json())
            .then(companyData => this.setState({companyData}))
    }

    render(){
        return (
            <div className='card card-companyInfo'>
                <div className='CompanyInfo'>
                    <div className='company-header'>
                        <h1 id='ticker'>{this.state.companyData.symbol}</h1>
                        <p id='title'>{this.state.companyData.companyName}</p>
                    </div>
                    <div className="company-details">
                        <div className="row">
                            <p className="company-details-head">Company</p>
                            <p className="company-details-data">{this.state.companyData.companyName}</p>
                        </div>
                        <div className="row">
                            <p className="company-details-head">Sector</p>
                            <p className="company-details-data">{this.state.companyData.sector}</p>
                        </div>
                        <div className="row">
                            <p className="company-details-head">Industry</p>
                            <p className="company-details-data">{this.state.companyData.industry}</p>
                        </div>
                        <div className="row">
                            <p className="company-details-head">Exchange</p>
                            <p className="company-details-data">{this.state.companyData.exchange}</p>
                        </div>
                        <div className="row">
                            <p className="company-details-head">CEO</p>
                            <p className="company-details-data">{getFirstAndLastWords(this.state.companyData.CEO)}</p>
                        </div>
                        <div className="row">
                            <p className="company-details-head">Employees</p>
                            <p className="company-details-data">{formatNumber(this.state.companyData.employees)}</p>
                        </div>
                        <div className="row">
                            <p className="company-details-head">Website</p>
                            <a target ="_blank" rel="noopener noreferrer" href={this.state.companyData.website}><p className="company-details-data">{this.state.companyData.website}</p></a>
                        </div>
                        <div className="row">
                            <p className="company-details-head">Location</p>
                            <p className="company-details-data">{this.state.companyData.city + ", " + this.state.companyData.country}</p>
                        </div>
                    </div>
                    <div className='description'>
                        <small>{getNWords(this.state.companyData.description, 20)}</small>
                    </div>
                    <div>

                    </div>
                    <div className='company-tags'>
                            {   
                                // checks if company data tags exist to avoid initial loading undefined error
                                this.state.companyData.tags && this.state.companyData.tags.map(function (tags, i) {
                                    return (
                                        <div className='tag' key={i}><p>{tags}</p></div>
                                    );
                                })
                            }
                    </div>
                </div>
            </div>
        );
    }
}

export default CompanyInfo;
