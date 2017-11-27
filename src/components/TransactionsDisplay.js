import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { trsFecthDataSuccess } from '../actions';

import firebase from '../containers/firebase';


class TransactionsDisplay extends Component {
    constructor(props) {
        super(props);
        this.trsFecthData = this.trsFecthData.bind(this)
    }

    trsFecthData() {
        const fetchTrs = () => {
            const TrsRef = firebase.database().ref('transactions');
            TrsRef.on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        sum: items[item].sum,
                        note: items[item].note
                    });
                }
                return newState;
            });
        };
        this.props.trsFecthDataSuccess([{sum: '50', note: 'It\'s syncronous call, with no await'}]);
    }
    componentDidMount() {
        this.trsFecthData();
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
    trsFecthDataSuccess: bindActionCreators(trsFecthDataSuccess, dispatch)
  }
}


export default connect( null , mapDispatchToProps )(TransactionsDisplay);