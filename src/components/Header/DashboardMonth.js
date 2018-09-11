// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

// *actions*
import { trsFecthData } from '../../actions';

// =Dev helpers=
import { ListOfMonth, filterByMonth } from './monthHelper';

class DashboardMonth extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            active: 2
        }

        this.HandleClick = this.HandleClick.bind(this);
    }

    HandleClick(e) {
        // determine if user clicks on the month and it is already active
        if (e.target.dataset.number === this.state.active) return;
        // chaning local state
        this.setState({active: e.target.dataset.number});
        // creating filters for fetching selected data
        var { startPoint, endPoint } = filterByMonth(e.target.dataset.number);
        // dispathcing an action
        this.props.trsFecthData(startPoint, endPoint);
    }

    render() {
        return (
            <div className="dashboardMonthHidden">
                <div className={ `dashboardMonth active-${this.state.active}` }>
                    {
                        ListOfMonth.map((item, index) => 
                            <button className={ item } onClick={ this.HandleClick } key={ item } data-number={ index }>
                                {item}
                            </button>
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