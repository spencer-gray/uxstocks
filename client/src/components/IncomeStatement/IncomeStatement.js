import React, { Component } from 'react';
import './IncomeStatement.css'
import { formatLargeToShortForm} from '../../helper/helper.js';  

class IncomeStatement extends Component {
    render(){
        return (
            <div className='card card-incomeInfo'>
                <div className='IncomeInfo'>
                    <div className='income-header'>
                        <p id='title'>Fiscal Year Key Statistics</p>
                    </div>
                    <div className="income-details">
                        <div className="income-row">
                            <p className="income-details-head">Revenue</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(this.props.yearlyIncomeStatementData.Revenue)).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Revenue Growth</p>
                            <p className="income-details-data">{(parseFloat(this.props.yearlyIncomeStatementData["Revenue Growth"])*100).toFixed(2).toString()}%</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Gross Profit</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(this.props.yearlyIncomeStatementData["Gross Profit"])).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Gross Margin</p>
                            <p className="income-details-data">{this.props.yearlyIncomeStatementData["Gross Margin"]}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">EBITDA</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(this.props.yearlyIncomeStatementData.EBITDA)).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Enterprise Value</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(this.props.keyStats["Enterprise Value"])).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Revenue Per Share</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseFloat(this.props.keyStats["Revenue per Share"]).toFixed(2)).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Debt to Equity</p>
                            <p className="income-details-data">{this.props.keyStats["Debt to Equity"]}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Profit Margin</p>
                            <p className="income-details-data">{this.props.yearlyIncomeStatementData["Profit Margin"]}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IncomeStatement;
