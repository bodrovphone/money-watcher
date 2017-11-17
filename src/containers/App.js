import React, { Component } from 'react';

import '../App.css';
import Header from '../components/Header'
import TransactionsDisplay from '../components/TransactionsDisplay';
import { connect } from 'react-redux';
import TransactionForm from '../components/TransactionForm';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
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
    return {
        transactions: state
    }
}


export default connect( mapStateToProps )(App);