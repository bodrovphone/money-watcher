import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { addTransaction } from '../actions';

import firebase from '../containers/firebase';

class TransactionForm extends Component {
    constructor(props) {
        super(props);
        this.registerTransaction = this.registerTransaction.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.state = {
          sum: '',
          note: ''
        };
    }

    registerTransaction() {
        const currentTrs = {
            sum: this.state.sum,
            note: this.state.note
        };
        //pushing transaction to firebase here:
        const trsRef = firebase.database().ref('transactions');
        trsRef.push(currentTrs);

        this.props.addTransaction(currentTrs);
        this.inputSum.value = '';
        this.inputNote.value = '';
        this.setState({
          sum: '',
          note: ''
        });
    }

    handleEnterPress(e) {
     if (e.key === 'Enter' && this.state.sum) {
        this.registerTransaction();
      }
    }

    render() {
        return (
            <MuiThemeProvider>
            <div>
              <TextField
                type="number"
                hintText="$ How much?"
                value={ this.state.sum }
                id="sum-input"
                ref={el => this.inputSum = el}
                onChange={event => this.setState({sum: event.target.value })}
                onKeyPress={(e) => this.handleEnterPress(e)}
              />
              <br/>
              <TextField
                type="text"
                floatingLabelText="Add a note"
                value={ this.state.note }
                id="sum-note"
                ref={el => this.inputNote = el}
                onChange={ event => this.setState({note: event.target.value })}
                onKeyPress={(e) => this.handleEnterPress(e)}
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