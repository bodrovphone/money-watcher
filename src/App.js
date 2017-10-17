import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TransactionsDisplay from './components/TransactionsDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.registerTransaction = this.registerTransaction.bind(this);
    this.state = {
      sum: '',
      note: '',
      transactions: []
    };
  }

  registerTransaction() {
    const currentTransaction = {
      key: Math.random(),
      sum: this.state.sum, 
      note: this.state.note};

    this.setState({
      sum: '',
      note: '',
      transactions: [...this.state.transactions, currentTransaction]
    });
  }

  render() {
    console.log(this.state);
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
                onChange={event => this.setState({sum: Number(event.target.value)})}
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
          <TransactionsDisplay transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default App;
