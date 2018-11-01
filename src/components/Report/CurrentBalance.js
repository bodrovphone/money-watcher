// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// *actions*
import { currentBalanceFetchData } from '../../actions';

// =Dev helpers=
import getSumOfTransactions from './helpers';
import { sumClass } from '../Display/helpers';


class CurrentBalance extends Component {

    conditionalRender(props) {
        const balance = +props.currentBalance;
        const expense = getSumOfTransactions(props.transactions);
        const balanceColor = sumClass(balance);
        const expenseColor = sumClass(expense);
        if (!isNaN(balance) && props.transactions) {
            return ( 
                <div className="CurrentBalance">
                    <div className="balance"><span className="text">Balance</span> <span className={`number ${balanceColor}`}>{balance}</span></div>
                    <div className="expense"><span className="text">Expense</span> <span className={`number ${expenseColor}`}>{expense}</span></div>
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
function mapStateToProps(state) {
    return {
        currentBalance: state.currentBalance,
        transactions: state.transactions
    }
}
export default connect( mapStateToProps , { currentBalanceFetchData } )(CurrentBalance);