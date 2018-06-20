// +core+
import React, { Component, Fragment } from 'react';

// =Dev helpers=
import dateFormat from 'dateformat';

// @markup
import Divider from 'material-ui/Divider';

// dateFormat(this.props.header, "dddd, mmmm dS, yyyy"
export default class Day extends Component {
    render() {
        return (
            <Fragment key={this.props.index}>
                <div key={this.props.index} className="Day">
                    <div className="DayInlineWrapper">
                        <div className="DayHeader">
                            <h2>{dateFormat(this.props.header, "dd")}</h2>
                        </div>
                        <div className="DayDateWrapper">
                            <span className="DayOfTheWeek">{dateFormat(this.props.header, "dddd")}</span>
                            <span className="DayMonth">{dateFormat(this.props.header, "mmmm, yyyy")}</span>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <Divider />
                    {this.props.children}
                </div>
            </Fragment>
            );
    }
}
