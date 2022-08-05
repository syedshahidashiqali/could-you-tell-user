import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import TagsInput from 'react-tagsinput';
import useMessagePopup from '../../Hooks/useMessagePopup';
import routes from '../../routes/routes';
import { sendInvite } from '../../Services/Events';
import { getLists } from '../../Services/Invitees';

export default function Invites() {
    const navigate = useNavigate();
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const {eventId} = useParams();
    const [newEmails, setNewEmails] = useState([]);
    const {successPopup, errorPopup} = useMessagePopup();
    const fetch = async ()=>{
        let {lists : listItems} = await getLists();
        setLists(listItems);
        if(listItems.length > 0){
            setSelectedList(listItems[0]);
        }
    } 
    const sendInvites = async (e)=>{
        let emails = [...selectedList.emails,...newEmails];
            try {
                let {message,status} = await sendInvite({eventId,list : selectedList._id,emails});
                if(status){
                    successPopup({
                        message,
                    });
                    navigate(reverse(routes.eventDetail,{id : eventId}));
                }
            } catch (error) {
                console.log(error);
                //  const {message} = error?.data;
                // if(message){
                    errorPopup({
                        message : error.toString(),
                    });
                // }
            }
            
    };

    useEffect(()=>{
        fetch();
    },[]);
    
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* Invitee Lists */}
                <div className="row align-items-start">
                    <div className="col-xl-6 col-lg-5 col-md-10 col-10 mx-auto text-start mb-5 ">
                        <div className="d-flex justify-content-between align-items-end">
                            <h1 className="heading-lvl-one d-flex align-items-center">
                                <a href="host-event-send-invites-1b.php" className="back-link">
                                    <i className="fas fa-chevron-left text-white" />
                                </a>{" "}
                                Send Invites
                            </h1>
                        </div>
                        <div className="profile-details mt-4 mb-lg-5 pb-2">
                            <div className="row align-items-start mb-5">
                                <form id="cut-form" className="mb-4">
                                    <div className="form-group mb-5">
                                        <label className="mb-2 ps-sm-4 ps-2" htmlFor="listName">
                                            Select List Name{" "}
                                        </label>
                                        <select
                                            className="form-select form-field me-3 mb-3"
                                            aria-label="Default select example"
                                            onChange={(e)=> setSelectedList(lists[e.target.value])}
                                        >
                                            {
                                                lists?.map((item,index)=>(
                                                        <option key={index} value={index}>{item.title}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group mb-5 ps-sm-4 ps-2">
                                        {/* Email Address */}
                                        <h5 className="mb-2 grey-text">Email Address </h5>
                                        <ul className="list-inline me-2 d-inline-block">
                                            {
                                                selectedList?.emails?.map((item,index)=>(
                                                    <li key={index} className="list-inline-item me-2 d-inline-block">
                                                        {item}{" "}
                                                        <button type="button" className="cut-btn red">
                                                            <i className="fas fa-times" />
                                                        </button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="form-group">
                                        {/* Email Address */}
                                        <div className="form-group">
                                            {/* Email Address */}
                                            <h5 className="mb-2 ps-sm-4 ps-2">
                                                Email Address<span className="red">*</span>
                                            </h5>
                                            <div className="multiple-val-input">
                                            <TagsInput value={newEmails} onChange={(emails)=> setNewEmails(emails)} />
                                            </div>
                                        </div>
                                        {/* <div className="multiple-val-input ps-sm-4 ps-2">
                                            
                                        </div> */}
                                    </div>
                                    <button
                                        onClick={sendInvites}
                                        type="button"
                                        className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3 px-4"
                                    >
                                        Send Invites
                                    </button>
                                </form>
                                <h5 className="grey-text">Sharable Link</h5>
                                <p className="silver-text mb-lg-5 mb-3 d-flex align-items-center">
                                    <a className="green-link" href="#">
                                        www.shareablelinkofevent.com
                                    </a>
                                    <button
                                        id="copy"
                                        type="button"
                                        className="bg-transparent border-0 ms"
                                    >
                                        <img src="images/copy-icon.svg" alt="" className="img-fluid" />
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-xl-6 col-lg-7 col-8 mx-auto text-center mb-5">
                        <div id="editInvitee" />
                    </div>
                </div>
            </div>
        </section>
    )
}
