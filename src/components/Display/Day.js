// +core+
import React, { Component } from 'react';

// =Dev helpers=
import dateFormat from 'dateformat';

// @markup
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

// dateFormat(this.props.header, "dddd, mmmm dS, yyyy"
export default class Day extends Component {
    render() {
        return (
            <Paper key={this.props.index + 1}>
                <div key={this.props.index} className="DayHeader">
                    <h2>{dateFormat(this.props.header, "dd")}</h2>
                    <span className="DayDay">{dateFormat(this.props.header, "dddd")}</span>
                    <span className="DayMonth">{dateFormat(this.props.header, "mmmm, yyyy")}</span>
                </div>
                <Divider />
                {this.props.children}
            </Paper>
            );
    }
}
