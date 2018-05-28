// +core+
import React from 'react';

// @markup
import Income from 'material-ui/svg-icons/action/thumb-up';
import Expense from 'material-ui/svg-icons/action/thumb-down';
import BeachAccess from 'material-ui/svg-icons/places/beach-access';
import Clothes from 'material-ui/svg-icons/maps/store-mall-directory';
import Credit from 'material-ui/svg-icons/action/credit-card';
import Food from 'material-ui/svg-icons/maps/restaurant';
import Health from 'material-ui/svg-icons/maps/local-hospital';
import Bills from 'material-ui/svg-icons/action/home';
import Other from 'material-ui/svg-icons/notification/more';
import Pets from 'material-ui/svg-icons/action/pets';
import Cart from 'material-ui/svg-icons/action/shopping-cart';
import Transport from 'material-ui/svg-icons/notification/time-to-leave';
import Cinema from 'material-ui/svg-icons/notification/ondemand-video';
import Restaurant from 'material-ui/svg-icons/maps/restaurant';
import Gym from 'material-ui/svg-icons/places/fitness-center';



export default function defaultSetOfIcons(icon) {
    const defaultSet = { 
        BeachAccess: <BeachAccess />,
        Income: <Income />,
        Expense: <Expense />,
        Clothes: <Clothes />,
        Credit: <Credit />,
        Food: <Food />,
        Health: <Health />,
        Bills: <Bills />,
        Other: <Other />,
        Pets: <Pets />,
        Cart: <Cart />,
        Transport: <Transport />,
        Cinema: <Cinema />,
        Restaurant: <Restaurant />,
        Gym: <Gym />
         }
         return defaultSet[icon]
}
