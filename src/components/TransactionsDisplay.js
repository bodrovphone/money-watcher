import React from 'react';
import {List, ListItem} from 'material-ui/List';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';

const TransactionsDisplay = (props) => {
    return (
        props.transactions.length ? 
        <MuiThemeProvider>
            <List>
                {
                    props.transactions.map(
                        (item, index) => {
                      return  <ListItem key={item.key} primaryText={item.sum} rightIcon={<AccountBalanceWallet />} /> 
                        }
                    )
                }
            </List>
        </MuiThemeProvider>
         : <br />
    )
}

function mapStateToProps(state) {
    return {
        transactions: state
    }
}

export default connect(mapStateToProps)(TransactionsDisplay);