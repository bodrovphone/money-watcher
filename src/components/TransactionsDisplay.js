// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { trsFecthData } from '../actions';

// =Dev helpers=
import groupTrsByDay from './helpers/groupTrsByDay';

// @markup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class TransactionsDisplay extends Component {

    componentDidMount() {
        // dispatching action only when the client is online
        navigator.onLine &&  this.props.trsFecthData();
    }

    render() {
        return (
            // conditional rendering
            this.props.transactions.length ? 

                // conditinal rendering if `true`
                <MuiThemeProvider>
                    <div>
                    {
                        groupTrsByDay(this.props.transactions)
                    }
                    </div>
                </MuiThemeProvider>

            // conditional rendering if `false`
            : <div>Fallback block goes here (no internet or transactions)</div>
            )
        }
}

function mapDispatchToProps(dispatch) {
  return {
    trsFecthData: bindActionCreators(trsFecthData, dispatch)
  }
}

// export
export default connect( null , mapDispatchToProps )(TransactionsDisplay);