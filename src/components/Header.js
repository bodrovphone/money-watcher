// +core+
import React from 'react';

// :design assets:
import logo from '../logo.svg';

const Header = () => {
    return (
        <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
        </header>
        );
};

// export
export default Header;