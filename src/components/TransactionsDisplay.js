// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { trsFecthData } from '../actions';

// @markup
import {List, ListItem} from 'material-ui/List';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class TransactionsDisplay extends Component {

    componentDidMount() {
        // dispatching action
        this.props.trsFecthData();
    }

    render() {
        return (
            // conditional rendering
            this.props.transactions.length ? 

                // conditinal rendering if `true`
                <MuiThemeProvider>
                    <List>
                        {
                        // iterating through all transactions
                            this.props.transactions.map(
                                (item, index) => {
                                    return  <ListItem 
                                                key={index} 
                                                primaryText={item.sum} 
                                                rightIcon={<AccountBalanceWallet  />}
                                            /> 
                                }
                            )
                        }
                    </List>
                </MuiThemeProvider>

            // conditional rendering if `false`
            : <br />
            )
        }
}


function mapDispatchToProps(dispatch) {
  return {
    trsFecthData: bindActionCreators(trsFecthData, dispatch)
  }
}

// export
export default connect( null , mapDispatchToProps )(TransactionsDisplay);