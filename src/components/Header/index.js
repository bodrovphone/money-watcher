// +core+
import React from 'react';

// &-components-&
import DashboardMonth from './DashboardMonth'

// :design assets:
import logo from '../../money-watcher_transparent_bg.png';
import './Header.css';


const Header = () => {
    return (
        <header className="App-header">
            <img src={ logo } className="" alt="logo" />
            <DashboardMonth />
        </header>
        );
};

// export
export default Header;