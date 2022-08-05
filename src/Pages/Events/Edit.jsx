import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useMessagePopup from '../../Hooks/useMessagePopup';
import routes from '../../routes/routes';
import { getEvent, updateEvent } from '../../Services/Events';
import { format_date } from '../../Util/helpers';

export default function EditEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const {successPopup, errorPopup} = useMessagePopup();
    const fetch = async () => {
        let { event: data } = await getEvent(id);
        data.date = format_date(data.date,'YYYY-MM-DD');
        setFormData({...formData,...data});
    };
    const submit = async (e)=> {
        e.preventDefault();
            try {
                let data = await updateEvent(id,{...formData});
                if(data.status){
                    successPopup({
                        message : data.message,
                    });
                    navigate(reverse(routes.eventDetail,{id}))
                }
            } catch (error) {
                console.log(error);
                errorPopup({
                    message : error.toString(),
                })

            }
            // console.log
    };
    useEffect(() => {
        fetch();
    }, [id]);
    
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* UPCOMING EVENTS */}
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
                        <form onSubmit={(e)=>submit(e)} id="cut-form">
                            <h1 className="heading-lvl-one mb-4 d-flex align-items-center">
                                <a href="upcoming-event-self-1a.php" className="back-link"><i className="fas fa-chevron-left text-white" /></a>
                                Edit Upcoming Event
                            </h1>
                            <div className="profile-details mt-4">
                                {/* Event Name* */}
                                <div className="form-group mb-4">
                                    <label htmlFor="eventName" className="ps-md-4 ps-2">Event Name<span className="red">*</span></label>
                                    <input value={formData.name} onChange={(e)=> setFormData({...formData,name : e.target.value})} type="text" className="form-control mt-2 form-field" id="eventName" placeholder="Enter Event Name" />
                                </div>
                                {/* Event Date* */}
                                <div className="form-group mb-4">
                                    <label htmlFor="eventDate" className="ps-md-4 ps-2">Event Date<span className="red">*</span></label>
                                    <input value={formData.date} onChange={(e)=> setFormData({...formData,date : e.target.value})} type="date" className="form-control mt-2 form-field" id="eventDate" placeholder="Select Date" />
                                </div>
                                {/* Event Time* */}
                                <div className="form-group mb-4">
                                    <label htmlFor="eventTime" className="ps-md-4 ps-2">Event Time<span className="red">*</span></label>
                                    <input value={formData.time} onChange={(e)=> setFormData({...formData,time : e.target.value})} type="time" className="form-control mt-2 form-field" id="eventTime" placeholder="Select Time" />
                                </div>
                                <h3 className="heading-lvl-three mb-3">Audio Media</h3>
                                {
                                    formData.media != null?
                                    <div className="d-flex mb-5">
                                        <a href="#" className="green-link media-link"><img src="images/folder.png" alt="" className="img-fluid me-2" />{formData?.media?.name}</a>
                                        <button onClick={(e)=> setFormData({...formData,media : null})} className="delete-btn bg-transparent border-0 ms-2"><img src="images/trash-icon.png" alt="" className="img-fluid" /></button>
                                    </div>:
                                    <div className="d-flex mb-5">
                                        <a onClick={(e)=>{e.preventDefault();document.querySelector('#mp3Selector').click()}} href="#" className="green-link media-link">{formData.file?formData?.file?.name:'Upload file'}</a>
                                        <input accept='audio/*' type="file" id='mp3Selector' onChange={(e)=> setFormData({...formData,file : e.target.files[0]})} />
                                    </div>
                                }
                                <div className="form-group mb-4">
                                    <input value={formData.repeat} onChange={(e)=>setFormData({...formData,repeat : 'once'})} className="me-1 mb-3" type="radio" id="once" name="radio-group" checked={formData.repeat == 'once'} />
                                    <label className="me-2 me-xl-4 mb-3" htmlFor="once">Once</label>
                                    <input value={formData.repeat} onChange={(e)=>setFormData({...formData,repeat : '1'})} className="me-1 mb-3" type="radio" id="1h" name="radio-group" checked={formData.repeat == 1} />
                                    <label  className="me-2 me-xl-4 mb-3" htmlFor="1h">01 hour loop</label>
                                    <input value={formData.repeat} onChange={(e)=>setFormData({...formData,repeat : '3'})} className="me-1 mb-3" type="radio" id="3h" name="radio-group" checked={formData.repeat == 3} />
                                    <label className="me-2 me-xl-4 mb-3" htmlFor="3h">03 hour loop</label>
                                    <input value={formData.repeat} onChange={(e)=>setFormData({...formData,repeat : 'unlimited'})} className="me-1 mb-3" type="radio" id="unlimited" name="radio-group" checked={formData.repeat == 'unlimited'} />
                                    <label className="me-2 me-xl-4 mb-3" htmlFor="unlimited">Unlimited</label>
                                </div>
                                <div className="form-group form-check mb-4">
                                    <input value={formData.upload_allowed} onChange={(e)=>setFormData({...formData,upload_allowed : e.target.checked})} type="checkbox" checked={formData.upload_allowed} className="form-check-input" id="uploadGiftImage" />
                                    <label className="form-check-label" htmlFor="uploadGiftImage">Allow attendees to upload gift images</label>
                                </div>
                                <button type='submit' className="gold-btn-solid d-inline-block my-md-4 my-1 eq-width-btn me-md-3 me-1">Save Changes</button>
                                <button type="button" onClick={(e)=> reverse(routes.eventDetail,{id})} className="grey-btn-outline d-inline-block my-md-4 my-1 eq-width-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-5 col-sm-8 mx-auto text-center mb-5">
                        <div id="eventDetailAnim" />
                    </div>
                </div>
            </div>
        </section>
    )
}
