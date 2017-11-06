import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TransactionsDisplay from './components/TransactionsDisplay';
import { connect } from 'react-redux';
import { addTransaction } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.registerTransaction = this.registerTransaction.bind(this);
    this.state = {
      sum: '',
      note: ''
    };
  }

  registerTransaction() {
    this.props.addTransaction({sum: this.state.sum, note: this.state.note});
  }

  render() {
    console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <MuiThemeProvider>
            <div>
              <TextField
                type="number"
                hintText="$ How much?"
                value={ this.state.sum }
                onChange={event => this.setState({sum: event.target.value})}
              />
              <br/>
              <TextField
                type="text"
                floatingLabelText="Add a note"
                value={ this.state.note }
                onChange={ event => this.setState({note: event.target.value })}
              />
              <div>
                <FloatingActionButton 
                  onClick={ ()=> this.registerTransaction() }
                  >
                  <ContentAdd />
                </FloatingActionButton>
              </div>
            </div>
          </MuiThemeProvider>
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

function mapDispatchToProps(dispatch) {
  return {
    addTransaction: bindActionCreators(addTransaction, dispatch)
  }
}


export default connect( mapStateToProps, mapDispatchToProps )(App);