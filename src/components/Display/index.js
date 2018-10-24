// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { trsFecthData } from '../../actions';

// =Dev helpers=
import groupTrsByDay from './groupTrsByDay';
import {startPoint, endPoint} from './helpers';

// @markup
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// :design assets:
import './Display.css';


class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startPoint: startPoint,
            endPoint: endPoint
        }
    }

    componentDidMount() {
        const {startPoint, endPoint} = this.state;
        // dispatching action only when the client is online + after I'll create a fallback with localstore
        navigator.onLine && this.props.trsFecthData(startPoint, endPoint);
    }

    render() {
        const { transactions } = this.props;
        return (
            // conditional rendering
            transactions.length ? 

                <MuiThemeProvider>
                    <div className="DisplayWrapper">
                    {
                        groupTrsByDay(transactions)
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