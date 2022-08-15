import React, { useState } from 'react'
import { useEffect } from 'react';
import useMessagePopup from '../../Hooks/useMessagePopup';
import { contactUs } from '../../Services/General';

function Contact() {
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        message : '',
    });
    let {successPopup} = useMessagePopup();
    const submit = async (e)=> {
        e.preventDefault();
        try{
            let {message} = await contactUs({...formData});
            setFormData({
                name : "",
                email : '',
                message : '',
            });
            successPopup({
                message, 
            });

        }catch(error){
                console.log(error);
                
        }
    };
    
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* Invitee Lists */}
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-10 col-10 mx-auto text-start mb-5 ">
                        <div className="d-flex justify-content-between align-items-end">
                            <h1 className="heading-lvl-one d-flex align-items-center">Contact Us</h1>
                        </div>
                        <div className="profile-details mt-4 mb-lg-5 pb-2">
                            <div className="row align-items-start mb-5">
                                <form onSubmit={(e)=> submit(e)} id="cut-form">
                                    <div className="form-group mb-5">
                                        <label className="mb-3 ps-sm-4 ps-2" htmlFor="name">Name <span className="red">*</span></label>
                                        <input value={formData?.name} onChange={(e)=> setFormData({...formData,name : e.target.value})} type="text" id="name" className="form-control form-field" placeholder="Enter Name" />
                                    </div>
                                    <div className="form-group mb-5">
                                        {/* Email Address */}
                                        <label className="mb-3 ps-sm-4 ps-2" htmlFor="email">Email Address  <span className="red">*</span></label>
                                        <input value={formData?.email} onChange={(e)=> setFormData({...formData,email : e.target.value})} type="email" id="email" className="form-control form-field" placeholder="Email Address" />
                                    </div>
                                    <div className="form-group mb-5">
                                        {/* Message */}
                                        <label className="mb-3 ps-sm-4 ps-2" htmlFor="email">Message  <span className="red">*</span></label>
                                        <textarea value={formData?.message} onChange={(e)=> setFormData({...formData,message : e.target.value})} className="form-control form-field" cols={30} rows={6} placeholder="Enter Message" />
                                    </div>
                                    <button className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3 px-4" data-bs-toggle="modal" data-bs-target="#contacted">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-8 mx-auto text-center mb-5">
                        <div id="contact" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact