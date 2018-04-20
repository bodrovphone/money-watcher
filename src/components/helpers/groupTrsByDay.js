// +core+
import React, { Fragment } from 'react';

// =Dev helpers=
import groupArray from 'group-array';
import dateFormat from 'dateformat';

// @markup
import {List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import AccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';

function groupTrsByDay(transactions) {
        // re-grouping object of arrays using helper
        const groupedTrs = groupArray(transactions, "date");

        // iterating through each day in the object
        return Object.keys(groupedTrs).reverse().map((key, index) => {
          const myItem = groupedTrs[key];
          
            return (
                <Fragment key={index}>
                    <List>
                        <Subheader>{dateFormat(key, "dddd, mmmm dS, yyyy")}</Subheader>
                            {
                                // iterating through each transaction in a day
                                myItem.map((nKey, nIdex) => (
                                    <ListItem 
                                        key={nIdex} 
                                        primaryText={nKey.sum} 
                                        secondaryText={nKey.category}
                                        rightIcon={<AccountBalanceWallet  />}
                                    />
                                ))
                                .reverse()
                            }
                    </List>
                    <Divider/>
                </Fragment>
                )})
    }

export default groupTrsByDay;