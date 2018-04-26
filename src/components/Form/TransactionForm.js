// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { addTransaction, catFecthData } from '../../actions';

// =Dev helpers=
import dateFormat from 'dateformat';
import dateFixer from './dateFixer';

// &-components-&
import CategoryPicker from './CategoryPicker';

// @markup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextFieldIcon from 'material-ui-textfield-icon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import ModeEditor from 'material-ui/svg-icons/editor/mode-edit';
import Add from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';

// :design assets:
import './Form.css';


class TransactionForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sum: "",
          note: "",
          category: null,
          date: new Date(),
          isCatPickerOpen: false
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        this.props.catFecthData();
        console.log(this.props.defaultCategory)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.defaultCategory !== prevState.category) {
            return {category: nextProps.defaultCategory}
        }
        return null;
    }

    registerTransaction() {
        // when adding trs with button - checking if sum or category isn't not null
        if (this.state.sum && this.state.category) { 
             // modifying the default date token for data node naming in fb
            const dateToken = dateFormat(this.state.date, "isoDateTime");
            const day = dateFormat(this.state.date, "isoDate");

            // copying state
            const currentTrs = {
                sum: this.state.sum,
                note: this.state.note,
                category: this.state.category,
                date: day,
                dateToken: dateToken
            };

            // dispatching action
            this.props.addTransaction(currentTrs);
            this.clearState();
            } else {
                // will display here an error message that the data isn't full
                return false;
        }
    }

    handleOpen() {
      this.setState({isCatPickerOpen: true});
    }

    handleClose(cat) {
      this.setState({isCatPickerOpen: false, category: cat});
    }

    clearState() {
      // clearing local state
        this.setState({
          sum: "",
          note: "",
          category: null,
          date: new Date()
        });
    }

    handleEnterPress(e) {
        // checing if `Enter` button has been clicked
        if (e.key === 'Enter' && this.state.sum && this.state.category) {
            this.registerTransaction();
            this.clearState();
          }
    }

    render() {
        return (
            <MuiThemeProvider>
                <div className="TransactionForm">
                    <TextFieldIcon
                      type="number"
                      hintText="How much?"
                      value={ this.state.sum }
                      icon={<AttachMoney tabindex="-1" />}
                      iconPosition="before"
                      tabindex="1"
                      id="sum-input"
                      onChange={event => this.setState({ sum: event.target.value })}
                      onKeyPress={(e) => this.handleEnterPress(e)}
                    />
                    <br/>
                    <TextFieldIcon
                      type="text"
                      hintText="Add a short note"
                      tabindex="2"
                      value={ this.state.note }
                      icon={<ModeEditor tabindex="-2" />}
                      iconPosition="before"
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

                    <CategoryPicker 
                        isCatPickerOpen = {this.state.isCatPickerOpen}
                        handleClose = {this.handleClose}
                        handleOpen = {this.handleOpen}
                        categories = {this.props.categories}
                        chosenCategory = {this.state.category}
                    />

                    <FloatingActionButton 
                      className="addTransactionButton"
                      backgroundColor="#556223"
                      iconStyle={{fill: "rgba(208,185,61,1)"}}
                      disabled={!this.state.sum}
                      onClick={ () => this.registerTransaction() }
                    >
                        <Add />
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
    addTransaction: bindActionCreators(addTransaction, dispatch),
    catFecthData: bindActionCreators(catFecthData, dispatch)
  }
}

// export
export default connect( mapStateToProps, mapDispatchToProps )(TransactionForm);