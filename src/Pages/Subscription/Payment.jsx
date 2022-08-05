import { reverse } from 'named-urls';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import NewCard from '../../Components/NewCards'
import SavedCards from '../../Components/SavedCards'
import routes from '../../routes/routes';
import { storeEvent } from '../../Services/Categories';
import { getPlan,subscribePackage } from '../../Services/Plans';
import { notification } from '../../Util/helpers';

export default function SubscriptionPayment() {
    const navigate = useNavigate();
    const [isNewCard, setIsNewCard] = useState(true);
    const [selectedCard,setSelectedCard] = useState(null);
    const [plan, setPlan] = useState(null);
    const [formData, setFormData] = useState({
        card: null,
    });
    const {plan : id} = useParams();
    let [searchParams,setSearchParams] = useSearchParams();
    let form = useRef({
        card: null,
    });
    const fetch = async ()=> {
        let data = await getPlan(id);
        setPlan(data.plan);
    };

    useEffect(()=>{
        fetch();
    },[]);

    const subscribe = async ()=> {
        if(selectedCard == null){
            notification('please select card first','danger');
            return;
        }
        try {
            let {data} = await subscribePackage({id, card : selectedCard});
            navigate(routes.subscriptions);
        } catch (error) {
            notification(error);
        }

    };
    // const  = async (selectedCard) => {
    //     await ;
    //    /*  try {
    //         let {event} = await storeEvent({ ...formData,event_category : id, });
    //         navigate(reverse(routes.hostEventSendInvite,{id, eventId: event._id}));            
    //     } catch (error) {
    //         console.log(error);
    //     } */
    // }
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
                                    <h3 className="grey-text">Plan</h3>
                                    <p>{plan?.name}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-6 mb-3">
                                {/* Event Cost */}
                                <div className="guest-info ms-2">
                                    <h3 className="grey-text">Plan Cost</h3>
                                    <p>${plan?.amount}</p>
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
                                <>
                                <NewCard setCard={(value) => setSelectedCard(value)}></NewCard>
                                <div className="row">
                                    <div className="col-12">
                                        <button onClick={()=> subscribe()} type="button" className="gold-btn-solid d-inline-block my-3 eq-width-btn me-3 text-center">Proceed</button>
                                        {/* <button type="button" className="grey-btn-outline d-inline-block my-3 eq-width-btn">Back</button> */}
                                    </div>
                                </div>
                                </>
                                :
                                <>
                                <SavedCards cardClass="card mt-2" setCard={(value) => setSelectedCard(value)}></SavedCards>
                                <div className="row">
                                    <div className="col-12">
                                        <button onClick={()=> subscribe()} type="button" className="gold-btn-solid d-inline-block my-3 eq-width-btn me-3 text-center">Proceed</button>
                                        {/* <button type="button" className="grey-btn-outline d-inline-block my-3 eq-width-btn">Back</button> */}
                                    </div>
                                </div>
                                </>
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
