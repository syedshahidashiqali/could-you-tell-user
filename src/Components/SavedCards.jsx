import { useDispatch, useSelector } from "react-redux"
import propTypes from 'prop-types';
import { deleteCard } from "../Services/Card";
import useMessagePopup from "../Hooks/useMessagePopup";
import { deleteSavedCard } from "../store/actions";
import { useState } from "react";

export const SavedCards = ({setCard,isDeleted,cardClass,selected})=> {
    const {user} = useSelector((state)=>state);
    const [selectedCard, setSelectedCard] = useState(null);
    const {successPopup,errorPopup} = useMessagePopup();
    const dispatch = useDispatch();
    const removeCard = async (cardId)=> {
            try {
                let {status,message} = await deleteCard(cardId);
                if(status){
                    successPopup({
                        message,
                    });
                    dispatch(deleteSavedCard(cardId))
                }
            } catch (error) {
                    console.log(error);
                    errorPopup({
                        message : error.toString(),
                    });
            }
    };

    const updateSelectedCard = (cardId)=>{
        let selectedCard = null;
        if(cardId != selected){
            selectedCard = cardId;
        }
        setSelectedCard(selectedCard);
        setCard(selectedCard);
    };

    return (
        <div className="form-group mb-3 text-start">
            {
                user?.saved_cards.map((card,index)=>(
                    <div key={index} className={cardClass?`saved-card  ${cardClass} ${selectedCard == card.cardId?'selected':''}`:'saved-card  mb-4'} >
                        <div className="row justify-content-start align-items-center flex-column flex-sm-row">
                            <div className="col-xl-3 col-md-4 col-sm-4 mb-2">
                                <div className="card-icon">
                                    <img src="images/master-card-icon.svg" alt="" className="img-fluid" />
                                </div>
                            </div>
                            <div onClick={()=> updateSelectedCard(card.cardId) } className="col-xl-9 col-md-8 col-sm-8 mb-2 text-lg-start col-center">
                                <h4 className="card-title">{card.cardHolder}</h4>
                                <p className="card-number">**************{card.last4}</p>
                            </div>
                            {
                                isDeleted?
                                <div className="col mb-2 text-end">
                                    <button onClick={()=> removeCard(card._id)} className="delete-btn bg-transparent border-0"><img src="images/bin-icon.png" alt="" className="img-fluid"/></button>
                                </div>:''
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
SavedCards.propTypes = {
    isDeleted : propTypes.bool,
    cardClass : propTypes.string,
};

SavedCards.defaultProps = {
    isDeleted : false,
    cardClass : '',
    selected : null,
};
export default SavedCards;
