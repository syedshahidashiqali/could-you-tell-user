import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../routes/routes'
import { getLists } from '../../Services/Invitees';

export default function Invitees() {
    const [lists, setLists] = useState([]);
    const [selectedList, setSelectedList] = useState([]);
    const fetch = async ()=>{
        let {lists : listItems} = await getLists();
        setLists(listItems);
        if(listItems.length > 0){
            setSelectedList(listItems[0]);
        }
    } 
    
    useEffect(()=>{
        fetch();
    },[]);


    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* Invitee Lists */}
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-10 col-10 mx-auto text-start mb-5 ">
                        <div className="d-flex justify-content-between align-items-end">
                            <h1 className="heading-lvl-one d-flex align-items-center">
                                Invitee Lists{" "}
                            </h1>
                        </div>
                        <div className="profile-details mt-4 mb-lg-5 pb-2">
                            <div className="row align-items-start mb-5">
                                <form id="cut-form">
                                    <div className="form-group mb-3">
                                        <label className="mb-2 ps-4" htmlFor="eventName">
                                            List Name
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
                                    <Link
                                        to={routes.createInviteeList}
                                        className="green-link bg-transparent border-0 d-block text-end ms-auto mb-3"
                                    >
                                        <i className="fas fa-plus-circle me-2" />
                                        Add New List
                                    </Link>
                                    <div className="form-group">
                                        {/* Email Address */}
                                        <h5 className="mb-2">Email Address</h5>
                                        <div className="silver-text mb-lg-3 mb-3">
                                            
                                            {
                                                selectedList?.emails?.map((item,index)=> (
                                                        <span key={index} className="d-inline-block me-3">{item} </span>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <Link
                                        to={reverse(routes.editInviteeList,{id : selectedList._id})}
                                        className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3 px-4 text-center"
                                    >
                                        Edit List
                                    </Link>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-8 mx-auto text-center mb-5">
                        <div id="inviteeList" />
                    </div>
                </div>
            </div>
        </section>

    )
}
