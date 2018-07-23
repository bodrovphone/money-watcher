// +core+
import React from 'react';

// :design assets:
import logo from '../../money-watcher_transparent_bg.png';
import './Header.css';

const Header = () => {
    return (
        <header className="App-header">
            <img src={ logo } className="" alt="logo" />
            <div className="dashboardMonth">
                <button>June</button>
                <button>July</button>
                <button>August</button>
            </div>
        </header>
        );
};

// export
export default Header;