import React, { Component } from 'react';
import './IncomeStatement.css'
import { formatLargeToShortForm, extractValueFromKey } from '../../helper/helper.js';  

class IncomeStatement extends Component {
    render(){
        return (
            <div className='card card-incomeInfo'>
                <div className='IncomeInfo'>
                    <div className='income-header'>
                        <p id='title'>Income Statement</p>
                    </div>
                    <div className="income-details">
                    <div className="income-row">
                            <p className="income-details-head">Year</p>
                            <p className="income-details-data">{this.props.yearlyIncomeStatementData.year.toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Revenue</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.incomeStatement, "revenue"))).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Net Income</p>
                            <p className="income-details-data">{formatLargeToShortForm(parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.incomeStatement, "netinc"))).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Gross Profit</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.incomeStatement, "grossProfit"))).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">EBITDA</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.incomeStatement, "ebitda"))).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Consolidated Income</p>
                            <p className="income-details-data">${formatLargeToShortForm(parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.incomeStatement, "consolidatedIncome"))).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">EPS</p>
                            <p className="income-details-data">${extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.incomeStatement, "eps").toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Debt to Equity</p>
                            <p className="income-details-data">{(parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.balanceSheet, "debt")) / parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.balanceSheet, "equity"))).toFixed(2).toString()}</p>
                        </div>
                        <div className="income-row">
                            <p className="income-details-head">Research and Development</p>
                            <p className="income-details-data">{formatLargeToShortForm(parseInt(extractValueFromKey(this.props.yearlyIncomeStatementData.statementData.incomeStatement, "rnd"))).toString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default IncomeStatement;
