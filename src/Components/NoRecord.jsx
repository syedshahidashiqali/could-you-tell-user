import React from 'react'
import propsType from 'prop-types';
const NoRecord = ({tag : Tag,data,colspan,className,children})=> {
  return (
    <>
    {
    (data.length == 0) ?
    
        Tag == 'tr'?
            <tr>
                <td className={`text-center ${className}`} colSpan={colspan}>No data available!</td>
            </tr>
        :
        <Tag className={className}>
            {children}
        </Tag>
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