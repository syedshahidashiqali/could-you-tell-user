import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useStepForm from '../../Hooks/useStepForm';
import AddressInfo from './Info-Cards/AddressInfo';
import CardInfo from './Info-Cards/CardInfo';

function CheckoutStep2(props) {
    let { data, currentStep, isActive, firstStep } = props;
    let { changeStep } = useStepForm(props);
    let {user} = useSelector(state => state);
    // watch change on card to get card details
    let [cardInfo,setCardInfo] = useState({});
    // let counter = 0;
    useEffect(()=> {
        if(data?.card){
            let card = user?.saved_cards?.find(card=> card.cardId == data.card);
            setCardInfo(card);
        }else{
            
            setCardInfo({});
        }
        console.log('sdasdas');
    },[data?.card]);

    return (
        <>
            {/* Address Details Summary */}
            <AddressInfo
            data={data?.billing?.hasDifferentShipping?data?.shipping:data?.billing}
            title='Ship To'
            onChange={()=> firstStep()}
            />
            <AddressInfo
                data={data?.billing}
                title='Bill To'
                onChange={()=> firstStep()}
            />
            {/* Pay With Options */}
            <CardInfo card={cardInfo}/>
        </>

    )
}


CheckoutStep2.defaultProps = {
    data: {
        shipping: {},
        billing: {},
    },
};

export default CheckoutStep2