// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { trsFecthData } from '../actions';

// =Dev helpers=
import dateFormat from 'dateformat';
import groupArray from 'group-array';

// @markup
import {List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';






class TransactionsDisplay extends Component {

    componentDidMount() {
        // dispatching action
        this.props.trsFecthData();
    }


    groupTransactionsByDay() {
        // created array of days
        const groupedTrs = groupArray(this.props.transactions, "date");

        return Object.keys(groupedTrs).reverse().map((key, index) => {
          const myItem = groupedTrs[key];
          return (
                <div key={index}>
                <List>
                    <Subheader>{key}</Subheader>
                    {myItem.map((nKey, nIdex) => (
                        <ListItem 
                                    key={nIdex} 
                                    primaryText={nKey.sum} 
                                    rightIcon={<AccountBalanceWallet  />}
                                />
                    ))}
                </List>
                <Divider/>
                </div>)
        })

     }

    render() {
        return (
            // conditional rendering
            this.props.transactions.length ? 

                // conditinal rendering if `true`
                <MuiThemeProvider>
                    <div>
                    {
                        this.groupTransactionsByDay()
                    // <List>
                    //     {
                    //     // iterating through all transactions preliminary reversing it
                    //         this.props.transactions.reverse().map(
                    //             (item, index) => {
                    //                 return  <ListItem 
                    //                             key={index} 
                    //                             primaryText={item.sum} 
                    //                             secondaryText={dateFormat(item.date, "dddd, mmmm dS, yyyy")}
                    //                             rightIcon={<AccountBalanceWallet  />}
                    //                         /> 
                    //             }
                    //         )
                    //     }
                    // </List>
                    }
                    </div>}
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