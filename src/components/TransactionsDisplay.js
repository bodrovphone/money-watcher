import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import {List, ListItem} from 'material-ui/List';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { trsFecthData } from '../actions';


class TransactionsDisplay extends Component {
    componentDidMount() {
        console.log('TransactionsDisplay just mounted');
        this.props.trsFecthData();
    }
    render() {
        return (
            this.props.transactions.length ? 
            <MuiThemeProvider>
                <List>
                    {
                        this.props.transactions.map(
                            (item, index) => {
                          return  <ListItem key={index} primaryText={item.sum} rightIcon={<AccountBalanceWallet  />} /> 
                            }
                        )
                    }
                </List>
            </MuiThemeProvider>
             : <br />
            )
        }
}



function mapDispatchToProps(dispatch) {
  return {
    trsFecthData: bindActionCreators(trsFecthData, dispatch)
  }
}


export default connect( null , mapDispatchToProps )(TransactionsDisplay);