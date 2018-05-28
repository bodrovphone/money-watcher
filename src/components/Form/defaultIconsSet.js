// +core+
import React from 'react';

// @markup
import Income from 'material-ui/svg-icons/editor/vertical-align-bottom';
import Expense from 'material-ui/svg-icons/editor/vertical-align-top';
import BeachAccess from 'material-ui/svg-icons/places/beach-access';
import Clothes from 'material-ui/svg-icons/maps/store-mall-directory';
import Credit from 'material-ui/svg-icons/action/credit-card';
import Food from 'material-ui/svg-icons/maps/restaurant';
import Health from 'material-ui/svg-icons/maps/local-hospital';


export default function defaultSetOfIcons(icon) {
    const defaultSet = { 
        BeachAccess: <BeachAccess />,
        Income: <Income />,
        Expense: <Expense />,
        Clothes: <Clothes />,
        Credit: <Credit />,
        Food: <Food />,
        Health: <Health />
         }
         return defaultSet[icon]
}
