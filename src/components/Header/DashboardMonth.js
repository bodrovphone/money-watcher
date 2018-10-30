// +core+
import React, { Component } from 'react';

// ~structural~
import { connect } from 'react-redux';

// *actions*
import { trsFecthData, changeMonth, currentBalanceFetchData } from '../../actions';

// =Dev helpers=
import { ListOfMonth, filterByMonth } from './helpers';

class DashboardMonth extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            active: 2
        }

        this.HandleClick = this.HandleClick.bind(this);
    }

    
    componentDidMount() {
        this.props.currentBalanceFetchData(this.props.activeMonth);
    }

    HandleClick(e) {
        const dataSet = e.target.dataset.number;
        // determine if user clicks on the month and it is already active
        if (dataSet === this.state.active) return;
        // chaning local state
        this.setState({active: dataSet});
        // creating filters for fetching selected data
        var { startPoint, endPoint } = filterByMonth(dataSet);
        // dispathcing an action => changing activeMonth
        this.props.changeMonth(startPoint.substring(0,7));
        // dispathcing an action => trsFecthData with the delay to achieve smooth animation when months are moving
        setTimeout(() =>  (this.props.trsFecthData(startPoint, endPoint)), 1100);
        // dispathcing an action => currentBalanceFetchData
        this.props.currentBalanceFetchData(startPoint.substring(0,7));
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

function mapStateToProps(state) {
    return {
        activeMonth: state.activeMonth
    }
    
}

// export
export default connect( mapStateToProps , {trsFecthData, changeMonth, currentBalanceFetchData} )(DashboardMonth);