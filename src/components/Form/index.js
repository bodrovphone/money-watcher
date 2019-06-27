// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// *actions*
import { updateFirebase, catFecthData } from '../../actions';

// =Dev helpers=
import dateFormat from 'dateformat';
import dateFixer from './helpers';

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
import UpdateIcon from 'material-ui/svg-icons/action/update';
import DatePicker from 'material-ui/DatePicker';
import Snackbar from 'material-ui/Snackbar';

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

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {
          sum: props.sum || "",
          note: props.note || "",
          category: props.category || "",
          date: new Date(dateFormat(props.date)) || new Date(),
          isCatPickerOpen: false,
          noCategoryAlert: false,
          noSumAlert: false,
          snackbarOpen: false,
          dateToken: props.dateToken || null
        };
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    componentDidMount() {
      if(!this.props.editing) {
        this.props.catFecthData();
      } else return;
    }

    formatDate(date){
      return dateFormat(date, "🕣 dddd dS mmmm");
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        // it needs for setting default category when I received one from transactions
        return !prevState.category ? {category: nextProps.defaultCategory} : null;
    }

    registerTransaction() {
        // copying state & props
        const { sum, category, date, note,  } = this.state;
        const { categories, currentBalance, dateToken = false, editing = false, handleClose, sum: previousSum = false, activeMonth } = this.props;
        // modifying the default date token for data node naming in fb
        const isoDateTime = dateFormat(date, "isoDateTime");
        const day = dateFormat(date, "isoDate");
        
        // forming transaction object
        const currentTrs = {
            // condition sum sign depending on the category choosen(expense/income)
            sum: categories.expense[category] ? -Math.abs(sum) : Math.abs(sum),
            note,
            category,
            date: day,
            dateToken: isoDateTime,
            // need current balance to calculate new one and send it to FB
            currentBalance,
            editedNodeKey: dateToken,
            editing,
            previousSum
        };

        // checking if sum or category isn't null
        if (+sum && category) { 
           
                this.props.updateFirebase(currentTrs, activeMonth);
                this.setState({snackbarOpen: true});
                this.clearState();
                this.props.handleClose && handleClose();

        } else {
            // let the user know he must add a sum
            sum ? this.setState({noCategoryAlert: true}) : this.setState({noSumAlert: true});
        } 
    }

    handleOpen() {
      this.setState({isCatPickerOpen: true});
    }

    handleClose(cat) {
      this.setState({isCatPickerOpen: false, category: cat, noCategoryAlert: false});
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
        if (e.key === 'Enter') {
            this.registerTransaction();
          }
    }

    closeSnackbar() {
      this.setState({
        snackbarOpen: false
      })
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={ muiTheme }>
                <div className="TransactionForm">

                    <TextFieldIcon
                      value={ this.state.sum }
                      onChange={ event => this.setState({ sum: event.target.value, noSumAlert: false }) }
                      onKeyPress={ e => this.handleEnterPress(e) }
                      type="number"
                      hintText={ this.state.noSumAlert ? "can't be blank" : "How much?" }
                      icon={ <AttachMoneyIcon color="rgba(208,185,61,1)" tabIndex="-1" /> }
                      iconPosition="before"
                      tabIndex="1"
                      underlineFocusStyle={ {borderColor: "rgb(158, 168, 124)"} }
                      className={ this.state.noSumAlert ? "noSumAlert" : "" }
                    />

                    <br/>
                    <TextFieldIcon
                      value={ this.state.note }
                      onChange={ event => this.setState({note: event.target.value }) }
                      onKeyPress={ (e) => this.handleEnterPress(e) }
                      type="text"
                      hintText="Add a short note"
                      tabIndex="2"
                      icon={ <ModeEditorIcon color="rgba(208,185,61,1)" tabIndex="-2" /> }
                      iconPosition="before"
                      underlineFocusStyle={ {borderColor: "rgb(158, 168, 124)"} }
                    />
                    
                    <CategoryPicker 
                        isCatPickerOpen = { this.state.isCatPickerOpen }
                        handleClose = { this.handleClose }
                        handleOpen = { this.handleOpen }
                        categories = { this.props.categories }
                        chosenCategory = { this.state.category }
                        noCategoryAlert = { this.state.noCategoryAlert }
                    />

                    <br/>
                    <DatePicker
                      className="datePicker"
                      hintText="Choose a date"
                      value={ this.state.date }
                      inputStyle={ {textAlign: "center", backgroundColor: "rgb(223, 217, 91)", } }
                      onChange={ (e,d) => this.setState({ date: dateFixer(d) }) }
                      autoOk={ true }
                      formatDate={ this.formatDate }
                      disableYearSelection={ true }
                    />

                    <FloatingActionButton 
                      className="updateFirebaseButton"
                      backgroundColor="#556223"
                      iconStyle={ {fill: "rgba(208,185,61,1)"} }
                      disabled={ !this.state.sum || !this.state.category }
                      onClick={ () => this.registerTransaction() }
                    >
                      {
                       this.props.editing ? <UpdateIcon /> : <AddIcon />
                      }
                    </FloatingActionButton>
                    <Snackbar
                      open={this.state.snackbarOpen}
                      message="Transaction's been added"
                      onRequestClose={this.closeSnackbar}
                      autoHideDuration={2500}
                      bodyStyle={{backgroundColor: "rgb(163, 188, 79)"}}
                    />
                </div>
            </MuiThemeProvider>
            );
    }
}


function mapStateToProps(state) {
    return {...state};
}

// export
export default connect( mapStateToProps, { updateFirebase, catFecthData } )(Form);