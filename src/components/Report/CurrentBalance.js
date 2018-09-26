// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// *actions*
import { currentBalanceFetchData } from '../../actions';


class CurrentBalance extends Component {
    componentDidMount() {
        this.props.currentBalanceFetchData();
    }
    render() { 
        return ( 
            <div className="CurrentBalance">
                <div className="balance">{this.props.currentBalance.current} Test Balance</div>
                <div className="expense">Test Expense</div>
            </div>
         );
    }
}
  
export default connect(null, { currentBalanceFetchData } )(CurrentBalance);