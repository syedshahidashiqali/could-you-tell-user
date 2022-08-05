import React, { useState } from 'react'
import NewCard from './NewCards'
import SavedCards from './SavedCards'

export default function PaymentPopup({paymentDetail}) {
    const [isNewCard, setIsNewCard] = useState(true);
    const setCard = (cardId)=> {
        alert(cardId);
    };
    return (
        <>
            <div className="modal fade text-dark" id="payment-popup" tabIndex={-1} aria-labelledby="paymentCardDetails" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content pb-5">
                        <div className="modal-header border-0 pb-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> <img src="images/close-icon.svg" alt="" className="img-fluid" /></button>
                        </div>
                        <div className="modal-body border-0 pt-0">
                            <h5 className="modal-title modal-heading text-center">Payment Details</h5>
                            <form className="modal-form mt-3 px-3">
                                <div className="form-group mb-3 text-start">
                                    <h5>Amount Payable</h5>
                                    <p className="mb-3">${paymentDetail?.amount}</p>
                                </div>
                                {/* type of cards radio boxes */}
                                <div className="form-group mb-5" id="paymentCards">
                                    <input onChange={()=> setIsNewCard(true)} type="radio" name="cardtype" id="newCard" className="input-hidden sharp-yellow" defaultChecked="true" onclick="myFunction();" />
                                    <label htmlFor="newCard" className="ps-0 me-2">
                                        <div className="card-type">
                                            <img src="images/credit-card-icon.svg" alt="" className="img-fluid mb-1" />
                                            new cards
                                        </div>
                                    </label>
                                    <input onChange={()=> setIsNewCard(false)} type="radio" name="cardtype" id="savedCard" className="input-hidden sharp-yellow" onclick="myFunction();" />
                                    <label htmlFor="savedCard" className="ps-0">
                                        <div className="card-type">
                                            <img src="images/credit-card-icon.svg" alt="" className="img-fluid mb-1" />
                                            saved cards
                                        </div>
                                    </label>
                                </div>
                                <div id="newBox">
                                {isNewCard? 
                                    <NewCard/>:
                                    <SavedCards setCard={(cardId)=> setCard(cardId)} cardClass="card p-2 mt-2"/>}
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn gold-btn-solid d-inline-block mt-4 eq-width-btn mx-auto" data-bs-toggle="modal" data-bs-target="#paymentFailed" data-bs-dismiss="modal">Proceed</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
