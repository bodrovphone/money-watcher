// +core+
import React, { Component } from 'react';

// &-components-&
import DashboardMonth from './DashboardMonth'

// :design assets:
import logo from './money-watcher_logo.png';
import './Header.css';


export default class Header extends Component {
    render() {
        return (
            <header className="AppHeader">
                <img src={ logo } className="" alt="logo" />
                <DashboardMonth />
            </header>
            );
    }
};