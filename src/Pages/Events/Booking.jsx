import { reverse } from 'named-urls';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useMatch, useNavigate, useParams, createSearchParams } from 'react-router-dom';
import Validator from 'validatorjs';
import routes from '../../routes/routes';
import { eventCategory, storeEvent } from '../../Services/Categories';

export default function Booking() {
    let { id } = useParams();
    const  navigate = useNavigate();
    const [validation,setValidation] = useState({});
    
    let [form,setForm] = useState({
        name : null,
        date : null,
        time : null,
        guest_of_honor : null,        
    });

    const submit = useCallback(async (e)=>{
        e.preventDefault();
        let validator = new Validator(form,{

             name : 'required',
             date : 'required',
             time : 'required',
             guest_of_honor : 'required',
        });

        setValidation(validator);
        if(validator.fails()) return;
        
        navigate({
            pathname : reverse(routes.hostEventsPay,{id}),
            search : createSearchParams({...form}).toString(),
        });
        
    });
    
    const [category, setCategory] = useState({});
    const fetch = useCallback(async ()=> {
        let {category : data} =  await eventCategory(id);
        setCategory(data);
    });
    
    useEffect(()=>{
         (async ()=> await fetch(id))();
    },[id]);
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* UPCOMING EVENTS */}
                <div className="row align-items-start justify-content-between">
                    <div className="col-lg-6 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
                        <form onSubmit={(e)=> submit(e)} id="cut-form">
                            <h1 className="heading-lvl-one mb-4 d-flex align-items-center">Virtual Event Preview</h1>
                            <div className="row">
                                <div className="col-md-4 col-sm-6 mb-4">
                                    {/* Event Type */}
                                    <div className="host-info ms-2">
                                        <h3 className="grey-text">Event Type</h3>
                                        <p>{category?.name}</p>
                                    </div>
                                </div>
                                <div className="col-md-4 col-sm-6 mb-4">
                                    {/* Event Cost */}
                                    <div className="guest-info ms-2">
                                        <h3 className="grey-text">Event Cost</h3>
                                        <p>${category?.cost}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-details mt-4">
                                {/* Event Name* */}
                                <div className="form-group mb-4">
                                    <label className="ps-sm-4 ps-2" htmlFor="eventName">Event Name <span className="red">*</span></label>
                                    <input type="text" value={form.name} onChange={(e)=> setForm({...form,name : e.target.value})} className="form-control mt-2 form-field" id="eventName" placeholder="Enter Event Name" />
                                    <span>{validation?.errors?.first('name')}</span>
                                </div>
                                {/* Event Date* */}
                                <div className="form-group mb-4">
                                    <label className="ps-sm-4 ps-2" htmlFor="eventDate">Event Date <span className="red">*</span></label>
                                    <input type="date" value={form.date} onChange={(e)=> setForm({...form,date : e.target.value})} className="form-control mt-2 form-field" id="eventDate" placeholder="Select Date" />
                                    <span>{validation?.errors?.first('date')}</span>
                                </div>
                                {/* Event Time* */}
                                <div className="form-group mb-4">
                                    <label className="ps-sm-4 ps-2" htmlFor="eventTime">Event Time <span className="red">*</span></label>
                                    <input type="time" value={form.time} onChange={(e)=> setForm({...form,time : e.target.value})} className="form-control mt-2 form-field" id="eventTime" placeholder="Select Time" />
                                    <span>{validation?.errors?.first('time')}</span>
                                </div>
                                {/* Guest of Honor */}
                                <div className="form-group mb-5">
                                    <label className="ps-sm-4 ps-2" htmlFor="guestOfHonor">Guest of Honor</label>
                                    <input type="text" value={form.guest_of_honor} onChange={(e)=> setForm({...form,guest_of_honor : e.target.value})} className="form-control mt-2 form-field" id="guestOfHonor" placeholder="Enter guest of honor name" />
                                    <span>{validation?.errors?.first('guest_of_honor')}</span>
                                </div>
                                <h3 className="heading-lvl-three mb-2">Want to purchase subscription?</h3>
                                <div className="d-flex mb-3">
                                    <a href="subscription-plans.php" className="green-link media-link">View subscription plans</a>
                                </div>
                                <button type='submit' className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3 text-center">Proceed</button>
                                <a href="host-event.php" className="grey-btn-outline d-inline-block my-4 eq-width-btn text-center">Back</a>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-5 col-sm-8 mx-auto text-center mb-5 pt-5">
                        <img src="images/virtual-event-preview.png" alt="" className="img-fluid" />
                    </div>
                </div>
            </div>
        </section>

    )
}
