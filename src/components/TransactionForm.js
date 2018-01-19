// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { trsRef } from '../containers/firebase';

// *actions*
import { addTransaction } from '../actions';

// =Dev helpers=
import dateFormat from 'dateformat';

// @markup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';

class TransactionForm extends Component {

    constructor(props) {
        super(props);
        this.registerTransaction = this.registerTransaction.bind(this);
        this.handleEnterPress = this.handleEnterPress.bind(this);
        
        this.state = {
          sum: "",
          note: "",
          date: new Date()
        };
    }

    registerTransaction() {
        // when adding trs with button - checking if sum's is not null
        if (!this.state.sum) return false;

        // modifying the default date token for data node naming in fb
        const dateToken = dateFormat(this.state.date, "isoDateTime");
        // const day = dateFormat(this.state.date, "fullDate");

        // copying state
        const currentTrs = {
            sum: this.state.sum,
            note: this.state.note,
            date: dateToken
        };

        // adding new tranaction to firebase
        trsRef.child(dateToken).set(currentTrs);

        // dispatching action
        this.props.addTransaction(currentTrs);
        
        // clearing inputs using refs
        this.inputSum.value = "";
        this.inputNote.value = "";
        
        // clearing locale state
        this.setState({
          sum: "",
          note: "",
          date: new Date()
        });
    }

    handleEnterPress(e) {
        // checing if `Enter` button has been clicked
        if (e.key === 'Enter' && this.state.sum) {
            this.registerTransaction();
          }
    }

    dateFixer(date) {
      // caclulating delta to fix 00:00:00 issue with DatePicker(re fb issue)
      const t = new Date(),
            ml = t.getMilliseconds(),
            sec = t.getSeconds(),
            min = t.getMinutes(),
            delta = ml + (sec*1000) + (min * 60 * 1000);

      return new Date(date.setTime(date.getTime() + delta));
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
                      onChange={event => this.setState({ sum: event.target.value })}
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
                    <br/>
                    <DatePicker
                      hintText="Controlled Date Input"
                      value={this.state.date}
                      onChange={(e,d) => this.setState({ date: this.dateFixer(d) })}
                      autoOk={true}
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