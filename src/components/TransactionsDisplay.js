import React, { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import firebase from '../containers/firebase';

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
            console.log('logs from on event', newState);
            return newState;
        });

};

const MyTest = fetchTrs();

console.log(`MyTest: ${MyTest}`);


export default class TransactionsDisplay extends Component {

render() {
    return (
        props.transactions.length ? 
        <MuiThemeProvider>
            <List>
                {
                    props.transactions.map(
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

 TransactionsDisplay;