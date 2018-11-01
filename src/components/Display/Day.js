// +core+
import React, { Component } from 'react';

// =Dev helpers=
import dateFormat from 'dateformat';
import getSumOfTransactions from '../Report/helpers';
import { sumClass } from './helpers';

// @markup
import Divider from 'material-ui/Divider';

// dateFormat(this.props.header, "dddd, mmmm dS, yyyy"
export default class Day extends Component {
    render() {
        const { index, header, transactions } = this.props;
        const daySum = getSumOfTransactions(transactions);
        const sumColor = sumClass(daySum);
        return (
                <div key={index} className="Day">
                    <div className="DayWrapper">
                        <div className="DayHeader">
                            <h2>{dateFormat(header, "dd")}</h2>
                            <div className={`DaySum ${sumColor}`}>{daySum}</div>
                        </div>
                        <div className="DayDateWrapper">
                            <span className="DayOfWeek">{dateFormat(header, "dddd")}</span>
                            <span className="DayOfMonth">{dateFormat(header, "mmmm, yyyy")}</span>
                        </div>
                    </div>
                    <Divider />
                    {this.props.children}
                </div>
            );
    }
}
