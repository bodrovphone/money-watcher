// +core+
import React, { Component } from 'react';

// =Dev helpers=
import dateFormat from 'dateformat';

// @markup
import Divider from 'material-ui/Divider';

// dateFormat(this.props.header, "dddd, mmmm dS, yyyy"
export default class Day extends Component {
    render() {
        return (
                <div key={this.props.index} className="Day">
                    <div className="DayWrapper">
                        <div className="DayHeader">
                            <h2>{dateFormat(this.props.header, "dd")}</h2>
                            <div className="DaySum">{this.props.transactions.reduce((sum, current) => Number(sum) + Number(current.sum), 0)}</div>
                        </div>
                        <div className="DayDateWrapper">
                            <span className="DayOfWeek">{dateFormat(this.props.header, "dddd")}</span>
                            <span className="DayOfMonth">{dateFormat(this.props.header, "mmmm, yyyy")}</span>
                        </div>
                    </div>
                    <Divider />
                    {this.props.children}
                </div>
            );
    }
}
