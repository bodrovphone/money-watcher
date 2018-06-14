// +core+
import React, { Fragment } from 'react';

// =Dev helpers=
import groupArray from 'group-array';

// @markup
import Day from './Day';

function groupTrsByDay(transactions) {
        // re-grouping object of arrays using helper
        const groupedTrs = groupArray(transactions, "date");

        // iterating through each day in the object
        return Object.keys(groupedTrs).reverse().map((day, index) => {
          const myItem = groupedTrs[day];
          
            return (
                <Fragment key={index}>
                    <Day header={day} index={index}>
                            {
                                // iterating through each transaction in a day
                                myItem.map((date, nIdex) => (
                                    <div key={date}>
                                        {date.sum} <br/>
                                        {date.category}
                                    </div>
                                ))
                                .reverse()
                            }
                    </Day>
                </Fragment>
                )})
    }

export default groupTrsByDay;