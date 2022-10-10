import { reverse } from 'named-urls';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import NewCard from '../../Components/NewCards'
import SavedCards from '../../Components/SavedCards'
import routes from '../../routes/routes';
import { storeEvent } from '../../Services/Categories';

export default function Pay() {
    const navigate = useNavigate();
    const [isNewCard, setIsNewCard] = useState(true);
    const [formData, setFormData] = useState({
        card: null,
    });
    const {id} = useParams();
    let [searchParams,setSearchParams] = useSearchParams();
    let form = useRef({
        card: null,
    });
    useMemo(() => {
        for (const [index,entry] of searchParams.entries()) {
            formData[index] = entry;
            setFormData({...formData});
        //  console.log(entry);
        }
    },[]);
    const eventPayment = async (selectedCard) => {
        console.log("selected card is: ", selectedCard);
        await setFormData({ ...formData, card: selectedCard });
        try {
            let {event} = await storeEvent({ ...formData,event_category : id, });
            navigate(reverse(routes.hostEventSendInvite,{id, eventId: event._id}));
        } catch (error) {
            console.log(error);
        }
    }

    console.log(formData)
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* UPCOMING EVENTS */}
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-10 col-10 mx-auto text-start mb-5 pe-lg-5">
                        {/* <form id="cut-form"> */}
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">Payment Details</h1>
                        <div className="row mb-3">
                            <div className="col-md-4 col-sm-6 mb-3">
                                {/* Event Type */}
                                <div className="host-info ms-2">
                                    <h3 className="grey-text">Event Type</h3>
                                    <p>Birthday</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mb-3">
                                {/* Event Cost */}
                                <div className="guest-info ms-2">
                                    <h3 className="grey-text">Event Cost</h3>
                                    <p>$200</p>
                                </div>
                            </div>
                        </div>
                        {/* type of cards radio boxes */}
                        <div className="form-group mb-5" id="paymentCards">
                            <input onChange={() => setIsNewCard(true)} type="radio" name="cardtype" id="newCard" className="input-hidden sharp-yellow" defaultChecked="true" />
                            <label htmlFor="newCard" className="ps-0 me-2">
                                <div className="card-type alternative-card">
                                    <img src="images/credit-card-icon.svg" alt="" className="img-fluid mb-1" />
                                    new cards
                                </div>
                            </label>
                            <input onChange={() => setIsNewCard(false)} type="radio" name="cardtype" id="savedCard" className="input-hidden sharp-yellow" />
                            <label htmlFor="savedCard" className="ps-0">
                                <div className="card-type alternative-card">
                                    <img src="images/credit-card-icon.svg" alt="" className="img-fluid mb-1" />
                                    saved cards
                                </div>
                            </label>
                        </div>

                        {
                            (isNewCard) ?
                                <NewCard setCard={(value) => eventPayment(value)} isCheckout></NewCard>
                                :
                                <SavedCards cardClass="card mt-2" setCard={(value) => eventPayment(value)}></SavedCards>
                        }
                        {/* </form> */}
                    </div>
                    <div className="col-lg-5 col-8 mx-auto text-center mb-5">
                        <div id="cards" />
                    </div>
                </div>
            </div>
        </section>
    )
}
