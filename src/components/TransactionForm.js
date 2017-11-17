import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { addTransaction } from '../actions';

class TransactionForm extends Component {
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
        return (
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


export default connect( mapStateToProps, mapDispatchToProps )(TransactionForm);