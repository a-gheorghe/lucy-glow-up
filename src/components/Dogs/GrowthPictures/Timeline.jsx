import React from 'react';
import { TimelineItem } from './TimelineItem';
import '../../../App.css';
import dayjs from 'dayjs';

export const Timeline = ({ data }) => {

    
    function groupTimesBy(theList, unit = 'month', timeParamName = 'create_time'){
        let toReturn = {};
    
        for(let listItem of theList) {
            const paramName = dayjs.unix(listItem[timeParamName]).startOf(unit).unix();
            if(toReturn[paramName] == null) {
                toReturn[paramName] = [];
            }
            toReturn[paramName].push(listItem);
        }
    
    
        return toReturn;
    }
        
    let byMonth = groupTimesBy(data, 'month', 'date');
    
    const monthEntries = Object.entries(byMonth).sort((a,b)=>a[0].localeCompare(b[0]));


    return (
       <div className="timeline-container">
           {monthEntries.map((entry, index) => {
               const month = dayjs.unix(entry[0]).format("MMMM YYYY")
               const data = entry[1];
               return (
                   <>
                    <div id={month.split(" ").join('-')}> {month} </div>
                    {data.map((item) => <TimelineItem item={item} key={item.id} />)}
                   </>
               )
           })}
         </div>

    )
}