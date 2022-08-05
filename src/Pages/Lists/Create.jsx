import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import useMessagePopup from '../../Hooks/useMessagePopup';
import routes from '../../routes/routes';
import { createList } from '../../Services/Invitees';
export default function CreateInviteeList() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        emails : []
    });
    const {successPopup} = useMessagePopup();
    const submit = async (e)=> {
        e.preventDefault();
        
        try {
            let {status,message} = await createList(formData);
            if(status){
                successPopup({
                    message,
                });
                navigate(routes.inviteesList);
                return;
            }

            
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* Invitee Lists */}
                <div className="row align-items-start">
                    <div className="col-lg-5 col-md-10 col-10 mx-auto text-start mb-5 ">
                        <div className="d-flex justify-content-between align-items-end">
                            <h1 className="heading-lvl-one d-flex align-items-center">
                                <a href="invitee-list.php" className="back-link">
                                    <i className="fas fa-chevron-left text-white" />
                                </a>{" "}
                                Create Invitee Lists
                            </h1>
                        </div>
                        <div className="profile-details mt-4 mb-lg-5 pb-2">
                            <div className="row align-items-start mb-5">
                                <form onSubmit={(e)=> submit(e)} id="cut-form">
                                    <div className="form-group mb-5">
                                        <label className="mb-2 ps-sm-4 ps-2" htmlFor="listName">
                                            List Name<span className="red">*</span>
                                        </label>
                                        <input
                                            value={formData.title}
                                            onChange={(e)=>setFormData({...formData,title : e.target.value})}
                                            type="text"
                                            name=""
                                            id="listName"
                                            className="form-control form-field"
                                            placeholder="Enter List Name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        {/* Email Address */}
                                        <h5 className="mb-2 ps-sm-4 ps-2">
                                            Email Address<span className="red">*</span>
                                        </h5>
                                        <div className="multiple-val-input">
                                        <TagsInput value={formData.emails} onChange={(emails)=> setFormData({...formData, emails })} />
                                        </div>
                                    </div>
                                    <button
                                        className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3 px-4"
                                    >
                                        Create
                                    </button>
                                    <button
                                        type="button"
                                        className="grey-btn-outline d-inline-block my-4 eq-width-btn"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-8 mx-auto text-center mb-5">
                        <div id="editInvitee" />
                    </div>
                </div>
            </div>
        </section>
    )
}
