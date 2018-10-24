// +core+
import React, { Component } from 'react';

// @markup
import defaultSetOfIcons from '../../constants/defaultIconsSet';
import ReactTooltip from 'react-tooltip';
import TransactionEditor from './transactionEditor';
import { sumClass, sumSign } from './helpers';

export default class SingleTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.editTrs = this.editTrs.bind(this);
    }

    handleClose() {
        this.setState({editing: false})
    }

    editTrs() {
        this.setState({editing: true})
    }
    
     render() {
        const { category, sum, note } = this.props;
        return (
            <div className="SingleTransaction" 
                data-tip data-for='global' 
                onDoubleClick={this.editTrs}>
                    <span className="STicon">{defaultSetOfIcons(category)}</span>
                    <span className="STcategory">{category}</span>
                    <span className={`STsum ${sumClass(sum)}`}>{sumSign(sum)}</span>
                    <div className="STnote">{note}</div>
                    <ReactTooltip id='global' place={ "left" }>
                        <span>Double click to edit</span>
                    </ReactTooltip>
                    <TransactionEditor 
                        open={this.state.editing} 
                        handleClose={this.handleClose}
                        {...this.props} 
                    />
            </div>
        )
    }
}