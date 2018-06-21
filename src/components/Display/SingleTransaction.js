// +core+
import React from 'react';

// @markup
import defaultSetOfIcons from '../constants/defaultIconsSet';

export default props => (
        <div className="SingleTransaction">
            <span className="STicon">{defaultSetOfIcons(props.item.category)}</span>
            <span className="STcategory">{props.item.category}</span>
            <span className="STsum">-{props.item.sum}</span>
            <div className="clear"></div>
            <div className="STnote">{props.item.note}</div>
        </div>
    )