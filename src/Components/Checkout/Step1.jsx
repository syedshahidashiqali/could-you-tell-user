import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStepForm from '../../Hooks/useStepForm'
import { getCountries } from '../../Services/General';
import AddressCard from '../AddressCard';
import NewCard from '../NewCards';
import SavedCards from '../SavedCards';

export default function CheckoutStep1(props) {
    let {onUpdate} = props;
    let {countries,user} = useSelector(state => state);
    let flag = false;
    let {changeStep} = useStepForm(props);        
    let [formData,setFormData] = useState({
        billing : {
            hasDifferentShipping : false,
        },
        shipping : {},
        card : null,
    });
    const [isNewCard, setIsNewCard] = useState(true);
    
    // update adddress just update formData State
    const updateAddress = (data,type)=> {
        setFormData({...formData,[type]: {...formData[type],...data}});
    };
    

    useEffect(()=> {   

        onUpdate(formData);
    },[formData]);

    return (
        <>
            <AddressCard                 
                onUpdate={(data)=> updateAddress(data,'billing')} 
                formFields={formData?.billing} 
                heading="Billing Address" 
                type="billing"
                />
            {
                (formData?.billing?.hasDifferentShipping?
                    <AddressCard 
                        onUpdate={(data)=> updateAddress(data,'shipping')} 
                        formFields={formData?.shipping} 
                        heading="Shipping Address" 
                        type="shipping"
                    />
                :'')
            }
            {/* Pay With Options */}
            <div className="dark-grey-bg p-4 mb-5">
                <h3 className="heading-lvl-three mb-4 grey-text">Pay With</h3>
                <div className="row">
                    <div className="col-12">
                        {/* type of cards radio boxes */}
                        <div className="form-group mb-4">
                            <input onChange={() => setIsNewCard(true)} className="me-1 mb-3" type="radio" id="creditCard" checked={isNewCard} name="card-switch" />
                            <label className="me-2 me-xl-4 mb-3 grey-text" htmlFor="creditCard"><i className="fas fa-credit-card" /> Add a debit or credit card</label>
                        </div>
                        <div className="form-group mb-4">
                            <input onChange={() => setIsNewCard(false)} className="me-1 mb-3" type="radio" id="creditCard1" checked={!isNewCard} name="card-switch" />
                            <label className="me-2 me-xl-4 mb-3 grey-text" htmlFor="creditCard1"><i className="fas fa-credit-card" /> Pay via Saved Cards</label>
                        </div>
                        {
                            (isNewCard) ?
                                <NewCard 

                                    tag='div'
                                    showBackBtn={false}
                                    setCard={(value) => setFormData({...formData,card : value})}
                                ></NewCard>
                                :
                                <SavedCards selected={formData?.card} cardClass="card mt-2" setCard={(value) => setFormData({...formData,card : value})}></SavedCards>
                        }
                    </div>
                </div>
            </div>
            <div className="col-12">
                <a onClick={()=> changeStep()} className="cursor gold-btn-solid d-inline-block text-center eq-width-btn me-3 px-4">Continue</a>
            </div>
        </>
    )
}
