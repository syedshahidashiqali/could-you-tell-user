import React, { useState } from 'react'
import { useEffect } from 'react';
import propTypes from 'prop-types';
import { getCities, getStates } from '../Services/General';
import { useSelector } from 'react-redux';

function AddressCard({heading,type,onUpdate,formFields}) {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    let {countries} = useSelector(state => state);
    const fetchStates = async (countryId)=> {
        let {states} = await getStates(countryId);
        setStates(states);
    };
    const fetchCities = async (stateId)=> {
        let {cities} = await getCities(stateId);
        setCities(cities);
    };
    // watch changes on country ID
    useEffect(()=>{
        let countryId = formFields?.country;
        if(countryId)
            fetchStates(countryId);
        else
            onUpdate({country : null});

    },[formFields?.country]);

    // watch changes on state ID
    useEffect(()=>{
        let stateId = formFields?.state;
        if(stateId)
            fetchCities(stateId);
        else 
            onUpdate({state : null});


    },[formFields?.state]);

    return (
        <>
            {/* Billing Address */}
            <div id='address-card' className="dark-grey-bg p-4 mb-5" >
                <h2 className="heading-lvl-three mb-4">{heading}</h2>
                <div className="row">
                    {/* Country Or Region */}
                    <div className="col-12 mb-4">
                        <label className="mb-2 ps-4" htmlFor="country">Country Or Region <span className="red">*</span></label>
                        <select onChange={(e)=> onUpdate({country : e.target.value})} className="form-select form-field" aria-label="country or region">
                            <option value=''>Select Country</option>
                            {
                                countries?.map((item,itemIndex)=>(
                                    <option key={itemIndex} value={item?._id}>{item?.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* First Name */}
                    <div className="col-md-6 mb-4">
                        <label className="mb-2 ps-4" htmlFor="fName">First Name <span className="red">*</span></label>
                        <input value={formFields?.first_name} onChange={(e)=> onUpdate({first_name : e.target.value})} type="text" id="fName" className="form-control form-field" placeholder="Enter First Name" />
                    </div>
                    {/* Last Name */}
                    <div className="col-md-6 mb-4">
                        <label className="mb-2 ps-4" htmlFor="lName">Last Name  <span className="red">*</span></label>
                        <input value={formFields?.last_name} onChange={(e)=> onUpdate({last_name : e.target.value})} type="text" id="lName" className="form-control form-field" placeholder="Enter Last Name" />
                    </div>
                    {/* Email Address */}
                    <div className="col-md-12 mb-4">
                        <label className="mb-2 ps-4" htmlFor="email">Email Address  <span className="red">*</span></label>
                        <input value={formFields?.email} onChange={(e)=> onUpdate({email : e.target.value})} type="text" id="email" className="form-control form-field" placeholder="Enter Last Name" />
                    </div>
                    {/* Street Address */}
                    <div className="col-12 mb-4">
                        <label className="mb-2 ps-4" htmlFor="streetAddress">Street Address <span className="red">*</span></label>
                        <input value={formFields?.street_address} onChange={(e)=> onUpdate({street_address : e.target.value})} type="text" id="streetAddress" className="form-control form-field" placeholder="Enter Street Address" />
                    </div>
                    {/* State/Province/Region */}
                    <div className="col-md-4 mb-4">
                        <label className="mb-2 ps-4" htmlFor="state">State/Province/Region <span className="red">*</span></label>
                        <select id='state' onChange={(e)=> onUpdate({state : e.target.value})} className="form-select form-field" aria-label="State/Province/Region">
                        <option value=''>Select State</option>
                            {
                                states?.map((item,itemIndex)=>(
                                    <option key={itemIndex} value={item?._id}>{item?.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* City */}
                    <div className="col-md-4 mb-4">
                        <label className="mb-2 ps-4" htmlFor="City">City <span className="red">*</span></label>
                        <select id='City' onChange={(e)=> onUpdate({city : e.target.value})} className="form-select form-field" aria-label="City">
                        <option value=''>Select City</option>
                            {
                                cities?.map((item,itemIndex)=>(
                                    <option key={itemIndex} value={item?._id}>{item?.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    {/* Zipcode */}
                    <div className="col-md-4 mb-4">
                        <label className="mb-2 ps-4" htmlFor="Zipcode">Zipcode <span className="red">*</span></label>
                        <input value={formFields?.zip_code} onChange={(e)=> onUpdate({zip_code : e.target.value})} type="text" id="Zipcode" className="form-control form-field" placeholder="Enter Zipcode" />
                    </div>
                    {/* Email Address */}
                    <div className="col-md-6 mb-4">
                        <label className="mb-2 ps-4" htmlFor="email">Email Address <span className="red">*</span></label>
                        <input value={formFields?.email} onChange={(e)=> onUpdate({email : e.target.value})} type="email" id="email" className="form-control form-field" placeholder="Enter Email Address" />
                    </div>
                    {/* Confirm Email Address */}
                    <div className="col-md-6 mb-4">
                        <label className="mb-2 ps-4" htmlFor="confirmEmail">Confirm Email Address  <span className="red">*</span></label>
                        <input value={formFields?.email_confirmation} onChange={(e)=> onUpdate({email_confirmation : e.target.value})} type="email" id="confirmEmail" className="form-control form-field" placeholder="Confirm Email Address" />
                    </div>
                    {/* phone number */}
                    <div className="col-12 mb-3">
                        <label className="mb-2 ps-4" htmlFor="PhoneNumber">Phone Number  <span className="red">*</span></label>
                        <div className="phone-number my-3">
                            <input value={formFields?.phone} id="PhoneNumber" onChange={(e)=> { onUpdate({phone : e.target.value})}} type="number" className="form-control form-field" placeholder='0000000' 
                                onKeyPress={(e) => {
                                    if(e.key == "e") {
                                        e.preventDefault()
                                    }
                                }}
                                />
                        </div>
                    </div>
                    {/* Ship To a Different Address */}
                    {
                        type == 'billing'?
                        <div className="col-12">
                            <div className="form-check">
                                <input onChange={(e)=> onUpdate({hasDifferentShipping : e.target.checked})} checked={formFields?.hasDifferentShipping} type="checkbox" className="form-check-input" id="shipToDifferent" />
                                <label className="form-check-label" htmlFor="shipToDifferent">Ship To a Different Address</label>
                            </div>
                        </div>
                        :''
                    }
                </div>
            </div>
        </>
    )
}
AddressCard.propTypes = {
    heading : propTypes.string,
    type : propTypes.string,
    formFields : propTypes.object,
    onUpdate : propTypes.func,
};
AddressCard.defaultProps = {
    heading : 'Address',
    type : '',
    formFields : {
        country : null,
        state : null,
        hasDifferentShipping : false,
        first_name : null,
        last_name : null,
        street_address : null,
        zip_code : null,
        email : null,
        email_confirmation : null,
        phone : null,
    },
    onUpdate : ()=> {},
};
export default AddressCard;