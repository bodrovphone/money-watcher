// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// *actions*
import { currentBalanceFetchData } from '../../actions';

// =Dev helpers=
import getSumOfTransactions from './calculator';


class CurrentBalance extends Component {

    conditionalRender(props) {
        const balance = +props.currentBalance;
        const expense = getSumOfTransactions(props.transactions);
        if (!isNaN(balance) && props.transactions) {
            return ( 
                <div className="CurrentBalance">
                    <div className="balance"><span className="text">Balance</span> <span className="number">{balance}</span></div>
                    <div className="expense"><span className="text">Expense</span> <span className="number">{expense}</span></div>
                </div>
             );
        } else {
            return ( 
                <div className="CurrentBalance">
                    <div className="balance"><span className="text">Balance</span> [fetching data...]</div>
                    <div className="expense"><span className="text">Expense</span> [fetching data...]</div>
                </div>
             );
        }
    }
    render() { 
        return this.conditionalRender(this.props) 
    }
}
  
export default connect(null, { currentBalanceFetchData } )(CurrentBalance);