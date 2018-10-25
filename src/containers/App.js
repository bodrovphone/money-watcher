// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// =Dev helpers=
import PropTypes from 'prop-types';

// &-components-&
import Header from '../components/Header'
import Display from '../components/Display';
import Form from '../components/Form';
import CurrentBalance from '../components/Report/CurrentBalance';

// :design assets:
import './App.css';

class App extends Component {
    
    render() {
        // set last picked category as a default one
        const [lastTrs] = this.props.transactions.slice(-1);
        const defaultCategory = lastTrs ? lastTrs.category : null;

        return (
            <div className="App">
                <Header />
                <CurrentBalance />  
                <Form defaultCategory={ defaultCategory } />
                <Display transactions={ this.props.transactions }/>
            </div>
        );
  }

}

App.propTypes = {
    transactions: PropTypes.array.isRequired,
    dataFetchErrored: PropTypes.bool.isRequired,
    dataIsLoading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return state;
}

// export
export default connect( mapStateToProps )(App);