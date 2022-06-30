import React, { Component, useCallback, useEffect, useState } from 'react'
import { Outlet, useMatch, useParams } from 'react-router-dom'
import { eventCategories } from '../../Services/Categories';
import EventCard from './Component/EventCard';

export default function Categories() {
    const [items, setitems] = useState([]);
    const fetch = useCallback(async ()=> {
        let {categories} =  await eventCategories();
        setitems(categories);
    });
    useEffect(()=>{
        return ()=> fetch();
    },[]);
    return (
        <>
            <section className="virtual-events text-white">
                <div className="container py-5">
                    <div className="row py-5 align-items-center">
                        <div className="col-12 text-start">
                            <h1 className="heading-lvl-one d-flex align-items-center font-weight-light">Host Event</h1>
                            <p className="text-white font-weight-light">Select an event to proceed</p>
                        </div>
                    </div>
                    {/* no subscriptions alert box */}
                    <div className="container">
                        <div className="row justify-content-center justify-content-lg-between align-items-center text-center">
                            {items.map((item,key) => <EventCard key={key} item={item}/>)}
                        </div>
                    </div>
                </div>
            </section>
            <Outlet></Outlet>

        </>
    )
}
