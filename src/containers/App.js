// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// &-components-&
import Header from '../components/Header'
import TransactionsDisplay from '../components/TransactionsDisplay';
import TransactionForm from '../components/TransactionForm';

// :design assets:
import '../App.css';

class App extends Component {
    render() {
      return (
          <div className="App">
              <Header />
              <TransactionForm {...this.props} />
              <TransactionsDisplay transactions={this.props.transactions}/>
          </div>
      );
  }
}

function mapStateToProps(state) {
    return state;
}

// export
export default connect( mapStateToProps )(App);