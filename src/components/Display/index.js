// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { trsFecthData } from '../../actions';

// =Dev helpers=
import groupTrsByDay from './groupTrsByDay';

// @markup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// :design assets:
import './Display.css';


class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPoint: "2018-05-",
            endPoint: "2018-06-"
        }
    }

    componentDidMount() {
        const {startPoint, endPoint} = this.state;
        // dispatching action only when the client is online
        navigator.onLine &&  this.props.trsFecthData(startPoint, endPoint);
    }

    render() {
        return (
            // conditional rendering
            this.props.transactions.length ? 

                // conditinal rendering if `true`
                <MuiThemeProvider>
                    <div className="DisplayWrapper">
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
export default connect( null , mapDispatchToProps )(Display);