import { reverse } from 'named-urls';
import React, { Children, useCallback, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Validator from 'validatorjs';
import useCardFormatter from '../Hooks/useCardFormatter';
import routes from '../routes/routes';
import { storeCard } from '../Services/Card';
import { pushSavedCardInfo } from '../store/actions';
import { notification } from '../Util/helpers';

function NewCard({setCard,showBackBtn,tag : Tag,showSubmitBtn,children}) {
    const [validation, setValidation] = useState(null)
    const {cardNumberFilter,updateFormData,formData,cardExpiryFilter} = useCardFormatter();
    const dispatch = useDispatch();
    const form = useRef({
        card_number : '',
        
    });
    let navigate = useNavigate();
    const submit = useCallback(async (e)=>{
        e.preventDefault();
        let validator = new Validator(formData,{
            card_holder : 'required',
            card_number : 'required',
            expiry : 'required',
            cvv : 'required',
        });

        setValidation(validator);
        if(validator.fails()) return;
        try {
            
            let {card,status} = await storeCard({...formData});
            if(status){
                dispatch(pushSavedCardInfo(card));
                setCard(card.cardId);
                notification("card created successfully");
                navigate(routes.subscriptions)
            }
        } catch (error) {
                notification(error?.message,'error');
        }

    });
    

    

    return (
        <div className="profile-details mt-4">
            <Tag onSubmit={(e)=> submit(e)}>                
                {/* Cardholder Name** */}
                <div className="form-group mb-4">
                    <label className="ps-sm-4 ps-2" htmlFor="cardHolderName">Cardholder Name <span className="red">*</span></label>
                    <input type="text" value={formData.card_holder} onChange={e=> updateFormData({...formData, card_holder : e.target.value})} className="form-control mt-2 form-field" id="cardHolderName" placeholder="Enter Cardholder Name" />
                    <span>{validation?.errors?.first('card_holder')}</span>
                </div>
                {/* Card Number* */}
                <div className="form-group mb-4">
                    <label className="ps-sm-4 ps-2" htmlFor="cardNumber">Card Number <span className="red">*</span></label>
                    <input type="text" value={formData.card_number} name="card_number" onChange={e=> cardNumberFilter(e.target.value)} className="form-control mt-2 form-field" id="cardNumber" placeholder="Enter Card Number" />
                    <span>{validation?.errors?.first('card_number')}</span>
                </div>
                {/* Expiry Date* */}
                <div className="row">
                    <div className="col-12 mb-2">
                        <label className="ps-sm-4 ps-2" htmlFor="expiryDate">Expiry Date <span className="red">*</span></label>
                    </div>
                    <div className="col-sm-12 mb-4">
                        <input className="form-select form-field" value={formData.expiry} onChange={e=> cardExpiryFilter(e.target.value)} />
                        <span>{validation?.errors?.first('expiry')}</span>
                    </div>
                </div>
                {/* CVV */}
                <div className="form-group mb-4">
                    <label className="ps-sm-4 ps-2" htmlFor="cvv">CVV <span className="red">*</span></label>
                    <input type="text" value={formData.cvv} onChange={e=> updateFormData({...formData, cvv : e.target.value})} className="form-control mt-2 form-field" id="cvv" placeholder="Enter CVV Number" />
                    <span>{validation?.errors?.first('cvv')}</span>
                </div>
                <div className="row">
                    <div className="col-12">
                        {
                            (showSubmitBtn?
                                <button type={Tag == 'form'?'submit':'button'} onClick={(e)=> Tag != 'form'?submit(e):''} className="gold-btn-solid d-inline-block my-3 eq-width-btn me-3 text-center">Proceed</button>
                            :
                            children)
                        }
                        {
                            showBackBtn?
                            <button type="button" className="grey-btn-outline d-inline-block my-3 eq-width-btn">Back</button>
                            :''
                        }
                    </div>
                </div>
            </Tag>
        </div>
    )
}
NewCard.defaultProps = {
    showBackBtn : false,
    tag : 'form',
    showSubmitBtn : true,
};
export default NewCard;