import { reverse } from "named-urls";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoRecord from "../../Components/NoRecord";
import routes from "../../routes/routes";
import { checkIsInvitee, getEvent, inviteStatus } from "../../Services/Events";
import { format_date, notification } from "../../Util/helpers";

export default function EventInvite() {
    let { id } = useParams();
    const navigate = useNavigate();
    const [isInvitee, setIsInvitee] = useState(false);
    const [event, setEvent] = useState({});
    const [invite, setInvite] = useState({});
    useEffect(() => {
        fetch();

    }, []);
    const fetch = async function () {
        const { status,invite } = await checkIsInvitee(id);
        setIsInvitee(status);
        setInvite(invite);
        if(status){
            let {event} = await getEvent(id);
            setEvent(event);
        }
    };
    const updateInviteStatus = async (status)=> {
            try {
                let {message} = await inviteStatus(id,status);
                notification(message);
                navigate(routes.invitedEvents);
            } catch (error) {
                    console.log(error);
                    notification(error.message,'error');
            }
    };
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* UPCOMING EVENTS */}
                <div className="row align-items-start">
                    <div className="col-12 my-5">
                        <h1 className="heading-lvl-one d-flex align-items-center">
                            <Link to={routes.invitedEvents} className="back-link"><i className="fas fa-chevron-left text-white" /></Link>
                            Event Invitation 
                        </h1>
                    </div>
                    {
                       (isInvitee && invite?.status == 'Pending') && 
                       (
                        <div className="col-lg-7 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
                            <div className="dark-grey-bg p-4 mb-5">
                                <div className="row justify-content-between">
                                    <div className="col-md-9 mb-3 order-2 order-md-1">
                                        <h3 className="heading-lvl-three mb-4">{event?.name}</h3>
                                        <ul className="grey-text">
                                            <li>Invited By: {event?.user_detail?.name}</li>
                                            <li>Event Date: {format_date(event?.user_detail?.date)}</li>
                                            <li>Event Time: {format_date(event?.user_detail?.time,'hh:mm A')}</li>
                                        </ul>
                                        <div>
                                            <button onClick={()=> updateInviteStatus(true)} className="gold-btn-solid d-inline-block my-4 eq-width-btn me-3">Accept</button>
                                            <button onClick={()=> updateInviteStatus(false)} className="grey-btn-outline d-inline-block my-4 eq-width-btn">Decline</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       )
                    }
                    {
                        (isInvitee && invite?.status != 'Pending')  && (
                            <div className="col-lg-7 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
                            <NoRecord>
                                You have already "{invite?.status}" the invite. 
                            </NoRecord>
                            </div>
                        )
                    }
                    {
                        (!isInvitee)  && (
                            <div className="col-lg-7 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
                            <NoRecord>
                                You don't have permission to access this page
                            </NoRecord>
                            </div>
                        )
                    }
                    <div className="col-lg-5 col-8 mx-auto text-center mb-5">
                        <div className="position-relative">
                            <img src="images/event-details-image.png" alt="" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
