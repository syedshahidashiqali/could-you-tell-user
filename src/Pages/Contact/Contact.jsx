import React, { useState } from 'react'
import { useEffect } from 'react';
import useMessagePopup from '../../Hooks/useMessagePopup';
import { contactUs } from '../../Services/General';
import Validator from 'validatorjs'

function Contact() {
    const [validation, setValidation] = useState({});
    const [formData, setFormData] = useState({
        name : '',
        email : '',
        message : '',
    });
    let {successPopup, errorPopup} = useMessagePopup();
    const submit = async (e)=> {
        e.preventDefault();
        try{
            let validator = new Validator(formData, {
                name: 'required',
                email: 'required',
                message: 'required'
            }, ["'name' is required", "'email' is required", "'message' is required"]);
            
            setValidation(validator)
            
            // if (validator.fails()) {
            //     console.log(27, validation?.messages)
            //     console.log("data",formData)
            //     console.log("errors",validation?.errors)
            //     console.log("errors 111111",validation?.errors?.get("name"))
            //     if(validation?.errors?.get("name")){
            //         return errorPopup({message: validation?.messages?.customMessages[0]});
            //     }
            //     if(validation?.errors?.get("email")){
            //         return errorPopup({message: validation?.messages?.customMessages[1]});
            //     }
            //     if(validation?.errors?.get("message")){
            //         return errorPopup({message: validation?.messages?.customMessages[2]});
            //     }
            // }
            if(validation.passes()){
                let { message } = await contactUs({...formData});
                setFormData({
                    name : "",
                    email : '',
                    message : '',
                });
                 successPopup({
                message, 
            });
            }else {
                console.log("catch error");
                if(formData.name === "" || formData.email === "" || formData.message === "") {
                    return errorPopup({ message: "Please fill all the required fields." })
                }
            }
            
           

        }catch(error){
                console.log("catch error",error);
                if(formData.name === "" || formData.email === "" || formData.message === "") {
                    return errorPopup({ message: "Please fill all the required fields." })
                }
                
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
                                        <input   value={formData?.name} onChange={(e)=> setFormData({...formData,name : e.target.value})} type="text" id="name" className="form-control form-field" placeholder="Enter Name" />
                                    </div>
                                    <div className="form-group mb-5">
                                        {/* Email Address */}
                                        <label className="mb-3 ps-sm-4 ps-2" htmlFor="email">Email Address  <span className="red">*</span></label>
                                        <input  value={formData?.email} onChange={(e)=> setFormData({...formData,email : e.target.value})} type="email" id="email" className="form-control form-field" placeholder="Email Address" />
                                    </div>
                                    <div className="form-group mb-5">
                                        {/* Message */}
                                        <label className="mb-3 ps-sm-4 ps-2" htmlFor="email">Message  <span className="red">*</span></label>
                                        <textarea  value={formData?.message} onChange={(e)=> setFormData({...formData,message : e.target.value})} className="form-control form-field" cols={30} rows={6} placeholder="Enter Message" />
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