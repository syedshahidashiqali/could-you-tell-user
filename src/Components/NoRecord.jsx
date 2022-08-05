import React from 'react'
import propsType from 'prop-types';
const NoRecord = ({tag,data,colspan,className,children})=> {
    let element;
    if(tag != 'tr'){
        element = document.createElement(tag,{});
        element.classList.add(className);
        element.appendChild(children);
    }

  return (
    <>
    {
    (data.length == 0) ?
    
        tag == 'tr'?
            <tr>
                <td className='text-center' colSpan={colspan}>No data available!</td>
            </tr>
        :
        element
    :''}
    </>
  )
}
NoRecord.propsType = {
    data : propsType.array,
    tag : propsType.string,
    colspan : propsType.number, 
};
NoRecord.defaultProps = {
    data : [],
    tag : 'div',
    colspan : 1,
};
export default NoRecord;