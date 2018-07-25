// +core+
import React, { Component } from 'react';
import dateFormat from 'dateformat';

import ListOfMonth from './monthHelper';

export default class DashboardMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: null,
            active: 2
        }
        this.HandleClick = this.HandleClick.bind(this);
    }
    HandleClick(e) {
        if (e.target.dataset.number == this.state.active) return;
        const animation = e.target.dataset.number > this.state.active ? "forward" : "backward";
        this.setState({animation: animation, active: e.target.dataset.number});
    }
    render() {
        console.log(this.state)
        return (
            <div className="dashboardMonthHidden">
                <div className={`dashboardMonth ${this.state.animation}`}>
                    {
                        ListOfMonth.map((item, index) => 
                            <button className={item} onClick={this.HandleClick} key={item} data-number={index}>{item}</button>
                            )
                    }
                </div>
            </div>
        )}
}