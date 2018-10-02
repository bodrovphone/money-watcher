// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// *actions*
import { currentBalanceFetchData } from '../../actions';

// =Dev helpers=
import getSumOfTransactions from './calculator';
import { startPoint } from '../Display/currentMonth';


class CurrentBalance extends Component {
    componentDidMount() {
        this.props.currentBalanceFetchData(startPoint.substring(0, 7));
    }
    // componentDidUpdate(prevProps) {
    //     if (this.props.transactions[0] && prevProps.transactions[0] && (prevProps.transactions[0].date !== this.props.transactions[0].date)) {
    //         this.props.currentBalanceFetchData(this.props.transactions[0].date.substring(0, 7));
    //         console.log('componentDidUpdate', this.props.transactions[0])
    //     }
    //   }
    conditionalRender(props) {
        const balance = +props.currentBalance;
        const expense = getSumOfTransactions(props.transactions);
        if (!isNaN(balance) && props.transactions) {
            return ( 
                <div className="CurrentBalance">
                    <div className="balance">Balance {balance}</div>
                    <div className="expense">Expense {expense}</div>
                </div>
             );
        }
        else {
            return ( 
                <div className="CurrentBalance">
                    <div className="balance">Balance [fetching data...]</div>
                    <div className="expense">Expense [fetching data...]</div>
                </div>
             );
        }
    }
    render() { 
        return this.conditionalRender(this.props) 
    }
}
  
export default connect(null, { currentBalanceFetchData } )(CurrentBalance);