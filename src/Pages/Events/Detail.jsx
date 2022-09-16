import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import routes from '../../routes/routes';
import { getEvent } from '../../Services/Events';
import { asset, excerpt, format_date } from '../../Util/helpers';

export default function EventsDetail() {
    const { id } = useParams();
    const [event, setEvent] = useState({})
    let user = useSelector(state => state?.user);
    const fetch = async () => {
        let { event: data } = await getEvent(id);
        setEvent(data);
    };
    useEffect(() => {
        fetch();
    }, [id]);
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* UPCOMING EVENTS */}
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-7 col-10 mx-auto text-start mb-5 pe-lg-5">
                        <div className="d-flex justify-content-between align-items-end">
                            <h1 className="heading-lvl-one d-flex align-items-center">
                                <a href="my-events.php" className="back-link"><i className="fas fa-chevron-left text-white" /></a> Upcoming Event
                            </h1>
                            {event?.user == user?._id && <Link to={reverse(routes.editEvent, { id })} className="edit-button"><img src="images/edit-icon.svg" alt="" className="img-fluid" /></Link>}
                        </div>
                        <div className="profile-details mt-4 mb-lg-5 pb-2">
                            <div className="row align-items-start mb-5">
                                <div className="col-lg-4 col-sm-6">
                                    {/* event type */}
                                    <h5 className="grey-text">Event Type</h5>
                                    <p className="silver-text mb-lg-5 mb-3">{event?.event_category?.name}</p>
                                    {/* event date */}
                                    <h5 className="grey-text">Event Date</h5>
                                    <p className="silver-text mb-lg-5 mb-3">{format_date(event?.date)}</p>
                                    {/* repeating frequency */}
                                    <h5 className="grey-text">Repeating Frequency</h5>
                                    <p className="silver-text mb-lg-5 mb-3">01 hour loop</p>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                    {/* event cost */}
                                    <h5 className="grey-text">Event Cost</h5>
                                    <p className="silver-text mb-lg-5 mb-3">{event.event_type}</p>
                                    {/* event time */}
                                    <h5 className="grey-text">Event Time</h5>
                                    <p className="silver-text mb-lg-5 mb-3">{event.time}</p>
                                    {/* event link */}
                                    <h5 className="grey-text">Event Link</h5>
                                    <p className="silver-text mb-lg-5 mb-3"><Link className="green-link" to={reverse(routes.attendEvent,{id})}>{asset(reverse(routes.attendEvent,{id}).substring(1)).substring(0,30) }</Link></p>
                                </div>
                                <div className="col-lg-4 col-sm-6">
                                    {/* event name */}
                                    <h5 className="grey-text">Event Name</h5>
                                    <p className="silver-text mb-lg-5 mb-3">{event.name}</p>
                                    {/* audio media */}
                                    <h5 className="grey-text">Audio Media</h5>
                                    <p className="silver-text mb-lg-5 mb-3"><a className="green-link" href="#">{event?.media?.name}</a></p>
                                </div>
                                <div className="col-12"><p className="grey-text">(Attendee Uploads Allowed)</p></div>
                            </div>
                        </div>
                        <h1 className="heading-lvl-one d-flex align-items-center mt-lg-5 mb-4">Invitee Details</h1>
                        {/* Email Address */}
                        <h5 className="grey-text">Email Address</h5>
                        <p className="silver-text mb-lg-5 mb-3">{
                            event?.invitees?.map((item, itemIndex) => (
                                <span>{item.email}{(itemIndex != (event?.invitees?.length - 1)) ? ', ' : ' '}</span>
                            ))
                        }</p>
                        {event?.user == user?._id && <Link to={reverse(routes.hostEventSendInvite, { id: event?.event_category?._id, eventId: id, })} className="gold-btn-solid d-inline-block my-4 eq-width-btn text-center">Manage Invites</Link>}
                        {/* Sharable Link */}
                        <h5 className="grey-text">Sharable Link</h5>
                        <p className="silver-text mb-lg-5 mb-3 d-flex align-items-center">
                            <a className="green-link" href="#">www.shareablelinkofevent.com</a>
                            <button id="copy" type="button" className="bg-transparent border-0 ms"><img src="images/copy-icon.svg" alt="" className="img-fluid" /></button>
                        </p>
                    </div>
                    <div className="col-lg-5 col-8 mx-auto text-center mb-5">
                        <img src="images/event-details-image.png" alt="" className="img-fluid" />
                        {event?.user == user?._id && <Link to={reverse(`${routes.events.index}/${routes.events.editRoom}`,{id : event._id})} className="gold-btn-solid d-inline-block my-4 eq-width-btn text-center">Edit Virtual Room</Link>}
                    </div>
                </div>
            </div>
        </section>
    )
}
