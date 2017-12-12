// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { trsRef } from '../containers/firebase';

// *actions*
import { addTransaction } from '../actions';

// @markup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class TransactionForm extends Component {

    constructor(props) {
        super(props);
        this.registerTransaction = this.registerTransaction.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        this.state = {
          sum: "",
          note: ""
        };
    }

    registerTransaction() {
        // copying state
        const currentTrs = {
            sum: this.state.sum,
            note: this.state.note
        };

        // adding new tranaction to firebase
        trsRef.push(currentTrs);

        // dispatching action
        this.props.addTransaction(currentTrs);
        
        // clearing inputs using refs
        this.inputSum.value = "";
        this.inputNote.value = "";
        
        // clearing locale state
        this.setState({
          sum: "",
          note: ""
        });
    }

    handleEnterPress(e) {
        // checing if `Enter` button has been clicked
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
    return state;
}

function mapDispatchToProps(dispatch) {
  return {
    addTransaction: bindActionCreators(addTransaction, dispatch)
  }
}

// export
export default connect( mapStateToProps, mapDispatchToProps )(TransactionForm);