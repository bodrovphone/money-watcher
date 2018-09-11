// +core+
import React from 'react';

// &-components-&
import DashboardMonth from './DashboardMonth'

// :design assets:
import logo from '../../money-watcher_logo.png';
import './Header.css';


const Header = () => {
    return (
        <header className="AppHeader">
            <img src={ logo } className="" alt="logo" />
            <DashboardMonth />
        </header>
        );
};

// export
export default Header;