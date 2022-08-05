import React, { useEffect, useState } from 'react'
import { range } from '../Util/helpers';
import propTypes from 'prop-types';
const Pagination = ({ data, totalKey,onPageChange }) => {
    const [page, setPage] = useState(1);

    const updatePage = (newValue)=> {
        onPageChange(newValue);
        setPage(newValue);        
    };

    return (
        <nav aria-label="pagination" id="cut-pagination" className="mx-auto">
            <ul className="pagination justify-content-center">
                {
                    (data[totalKey] > 1 && page == data[totalKey]) ?
                        <li className="page-item">
                            <a onClick={() => (data[totalKey] > 0 ? updatePage(page - 1) : updatePage(1))} className="page-link">
                                previous
                            </a>
                        </li>
                        :
                        ''
                }
                
                {
                    data[totalKey] > 1?
                    [...Array(data[totalKey]).keys()].map((value,index) => (
                        <li key={index} className={page == (value + 1)?'page-item active':'page-item'}>
                            <a className="page-link" onClick={(e)=> page != (value + 1)? updatePage(value + 1): ''}>
                                {value + 1}
                            </a>
                        </li>
                    ))
                    :''
                }

                {
                    (data[totalKey] > 1 && page != data[totalKey]) ?
                        <li className="page-item">
                            <a onClick={() => (data[totalKey] > 0 ? updatePage(page + 1) : updatePage(1))} className="page-link">
                                Next
                            </a>
                        </li>
                        :
                        ''
                }
            </ul>
        </nav>
    )
}
Pagination.propTypes = {
    totalKey: propTypes.string,
    data: propTypes.object,
    onPageChange : propTypes.func,
};

Pagination.defaultProps = {
    totalKey: 'total',
    data: {},
    onPageChange : (value)=> {},

};
export default Pagination;