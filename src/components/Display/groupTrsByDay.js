// +core+
import React from 'react';

// =Dev helpers=
import groupArray from 'group-array';

// @markup
import Day from './Day';
import SingleTransaction from './SingleTransaction';

function groupTrsByDay(transactions) {
        // re-grouping object of arrays using helper
        const groupedTrs = groupArray(transactions, "date");
        // iterating through each day in the object
        return (Object.keys(groupedTrs)
                .reverse()
                .map((day, index) => {
                    return (
                        <Day header={day} index={index} key={day} transactions={groupedTrs[day]}>
                            {
                                // iterating through each transaction in a day
                                groupedTrs[day].map((item, index) => (
                                    <SingleTransaction 
                                        key={index} 
                                        sum={item.sum}
                                        note={item.note}
                                        date={item.date}
                                        category={item.category}
                                        index={index}
                                        dateToken={item.dateToken}
                                         />
                                ))
                                .reverse()
                            }
                        </Day>
                    )
                })
        )
}

export default groupTrsByDay;