import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { joinText } from '../../../Util/helpers'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function AddressInfo({data,onChange,title}) {
    let { countries } = useSelector(state => state);
    const [countryInfo, setCountryInfo] = useState(null);

    const getCountryInfo = (countryId) => {
        let countryInfo = countries.find(country => country._id == countryId);
        setCountryInfo(countryInfo);
    };
    // when country is selected for particular Address Type we will set country Info 
    useEffect(()=> {
        if(data?.country){
            getCountryInfo(data.country);
        }
    },[data?.country]);
    return (
        <div className="dark-grey-bg p-4 mb-5">
            <div className="row justify-content-between">
                <div className="col-md-9 mb-3">
                    <h3 className="heading-lvl-three mb-4">{title}</h3>
                    <ul className="grey-text">
                        <li className="mb-2">{joinText(data?.first_name, data?.last_name)}</li>
                        <li className="mb-2">{joinText(data?.street_address)}</li>
                        <li className="mb-2">{countryInfo?.name}</li>
                        <li className="mb-2">{data?.name}</li>
                        <li className="mb-2">({data?.phone})</li>
                    </ul>
                </div>
                <div className="col-md-3 mb-3 text-end">
                    <a onClick={() => onChange()} className="cursor green-link font-weight-lighter">Change</a>
                </div>
            </div>
        </div>
    )
}

AddressInfo.propTypes = {}
AddressInfo.defaultTypes = {}

export default AddressInfo
