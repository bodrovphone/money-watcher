// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { addTransaction } from '../actions';

// =Dev helpers=
import dateFormat from 'dateformat';
import dateFixer from './helpers/dateFixer';

// @markup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';



class TransactionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sum: "",
          note: "",
          date: new Date(),
          isCatPickerOpen: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    registerTransaction() {
        // when adding trs with button - checking if sum's is not null
        if (!this.state.sum) return false;

        // modifying the default date token for data node naming in fb
        const dateToken = dateFormat(this.state.date, "isoDateTime");
        const day = dateFormat(this.state.date, "isoDate");

        // copying state
        const currentTrs = {
            sum: this.state.sum,
            note: this.state.note,
            date: day,
            dateToken: dateToken
        };

        // dispatching action
        this.props.addTransaction(currentTrs);
        
    }

    handleOpen() {
      this.setState({isCatPickerOpen: true});
    }

    handleClose() {
      this.setState({isCatPickerOpen: false});
    }

    clearState() {
      // clearing local state
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
            this.clearState();
          }
    }

    render() {
      const categories = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
      <IconButton>
      <ActionHome />
    </IconButton>
    ];

        return (
            <MuiThemeProvider>
                <div>
                     <TextField
                      type="number"
                      hintText="$ How much?"
                      value={ this.state.sum }
                      id="sum-input"
                      onChange={event => this.setState({ sum: event.target.value })}
                      onKeyPress={(e) => this.handleEnterPress(e)}
                    />
                    <br/>
                    <br/>
{/*buildign category picker here (should be a separate module eventually)*/}

                    <RaisedButton label="Dialog" onClick={this.handleOpen} />
                    <br/>
                    <br/>
                    <Dialog
                      title="Dialog With Actions"
                      actions={categories}
                      modal={false}
                      open={this.state.isCatPickerOpen}
                      onRequestClose={this.handleClose}
                      autoScrollBodyContent={true}
                    >
                        <Tabs>
                            <Tab
                              icon={<FontIcon className="material-icons">phone</FontIcon>}
                              label="RECENTS"
                              >
                              <FlatButton
                                label="Submit"
                                primary={true}
                                keyboardFocused={true}
                                onClick={this.handleClose}
                              />
                            </Tab>
                            <Tab
                              icon={<FontIcon className="material-icons">favorite</FontIcon>}
                              label="FAVORITES"
                            >
                              <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={this.handleClose}
                              />
                            </Tab>
                            <Tab
                              icon={<MapsPersonPin />}
                              label="NEARBY"
                            >
                                <IconButton>
                                  <ActionHome />
                                </IconButton>
                            </Tab>
                        </Tabs>
                    </Dialog>

                    <TextField
                      type="text"
                      floatingLabelText="Add a note"
                      value={ this.state.note }
                      id="sum-note"
                      onChange={ event => this.setState({note: event.target.value })}
                      onKeyPress={(e) => this.handleEnterPress(e)}
                    />
                    <br/>
                    <DatePicker
                      hintText="Controlled Date Input"
                      value={this.state.date}
                      onChange={(e,d) => this.setState({ date: dateFixer(d) })}
                      autoOk={true}
                    />
                    <FloatingActionButton 
                      onClick={ () => {
                                        this.registerTransaction();
                                        this.clearState();
                                      }}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
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