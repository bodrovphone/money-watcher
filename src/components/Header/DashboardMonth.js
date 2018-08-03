// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { trsFecthData } from '../../actions';

// =Dev helpers=
import { ListOfMonth, filterByMonth } from './monthHelper';
import dateFormat from 'dateformat';

class DashboardMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 2
        }
        this.HandleClick = this.HandleClick.bind(this);
    }
    HandleClick(e) {
        if (e.target.dataset.number == this.state.active) return;
        this.setState({active: e.target.dataset.number});
        var { startPoint, endPoint } = filterByMonth(e.target.dataset.number);
        this.props.trsFecthData(startPoint, endPoint);
    }
    render() {
        console.log(this.state)
        return (
            <div className="dashboardMonthHidden">
                <div className={`dashboardMonth active-${this.state.active}`}>
                    {
                        ListOfMonth.map((item, index) => 
                            <button className={item} onClick={this.HandleClick} key={item} data-number={index}>{item}</button>
                            )
                    }
                </div>
            </div>
        )}
}

function mapDispatchToProps(dispatch) {
  return {
    trsFecthData: bindActionCreators(trsFecthData, dispatch)
  }
}

// export
export default connect( null , mapDispatchToProps )(DashboardMonth);