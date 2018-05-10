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
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextFieldIcon from 'material-ui-textfield-icon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AttachMoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import ModeEditorIcon from 'material-ui/svg-icons/editor/mode-edit';
import AddIcon from 'material-ui/svg-icons/content/add';
import DatePicker from 'material-ui/DatePicker';

// :design assets:
import './Form.css';
const muiTheme = getMuiTheme({
  palette: {
    pickerHeaderColor: "rgb(164, 198, 57)",
    clockCircleColor: "#008000",
    primary1Color: "#008000",
    primary2Color: "#008000",
    accent1Color: "#ff5722"
  }
});



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

    formatDate(date){
      return dateFormat(date, "🕣 dddd dS mmmm");
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
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="TransactionForm">
                    <TextFieldIcon
                      value={ this.state.sum }
                      onChange={event => this.setState({ sum: event.target.value })}
                      onKeyPress={(e) => this.handleEnterPress(e)}
                      type="number"
                      hintText="How much?"
                      icon={<AttachMoneyIcon color="rgba(208,185,61,1)" tabIndex="-1" />}
                      iconPosition="before"
                      tabIndex="1"
                      underlineFocusStyle={{borderColor: "rgb(158, 168, 124)"}}
                    />
                    <br/>
                    <TextFieldIcon
                      value={ this.state.note }
                      onChange={ event => this.setState({note: event.target.value })}
                      onKeyPress={(e) => this.handleEnterPress(e)}
                      type="text"
                      hintText="Add a short note"
                      tabIndex="2"
                      icon={<ModeEditorIcon color="rgba(208,185,61,1)" tabIndex="-2" />}
                      iconPosition="before"
                      underlineFocusStyle={{borderColor: "rgb(158, 168, 124)"}}
                    />
                    
                    <CategoryPicker 
                        isCatPickerOpen = {this.state.isCatPickerOpen}
                        handleClose = {this.handleClose}
                        handleOpen = {this.handleOpen}
                        categories = {this.props.categories}
                        chosenCategory = {this.state.category}
                    />

                    <br/>
                    <DatePicker
                      className="datePicker"
                      hintText="Choose a date"
                      value={this.state.date}
                      inputStyle={{textAlign: "center", backgroundColor: "rgb(223, 217, 91)", }}
                      onChange={(e,d) => this.setState({ date: dateFixer(d) })}
                      autoOk={true}
                      formatDate={this.formatDate}
                      disableYearSelection={true}
                    />

                    <FloatingActionButton 
                      className="addTransactionButton"
                      backgroundColor="#556223"
                      iconStyle={{fill: "rgba(208,185,61,1)"}}
                      disabled={!this.state.sum}
                      onClick={ () => this.registerTransaction() }
                    >
                        <AddIcon />
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