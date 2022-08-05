export const actions = {
    SET_AUTH_USER: 'SET_USER',
    SET_AUTH_STATUS: 'SET_AUTH_STATUS',
    ADD_SAVED_CARD : 'ADD_SAVED_CARD',
    UPDATE_SUCCESS_POPUP : 'UPDATE_SUCCESS_POPUP',
    DELETE_SAVED_CARD : 'DELETE_SAVED_CARD',
    SET_CART_ITEMS : 'SET_CART_ITEMS',
} 
export function setAuthUser(user)
{
    return {
        type: actions.SET_AUTH_USER,
        payload: user
    }
}

export function setAuthStatus(status)
{
    return {
        type: actions.SET_AUTH_STATUS,
        payload: status
    }
}

export const pushSavedCardInfo = (cardDetail)=> {
    return {
        type : actions.ADD_SAVED_CARD,
        payload : cardDetail,
    }    
}

export const updateSuccessPopup = (value, params = {})=> {
    return {
        type : actions.UPDATE_SUCCESS_POPUP,
        payload : {
            successPopup : value,
            success_popup_params : params,
        },
    }
};

export const deleteSavedCard = (cardId)=> {
        return {
            type : actions.DELETE_SAVED_CARD,
            payload : cardId,
        }
}


export const setCart = (cartItems) =>{
    return {
        type : actions.SET_CART_ITEMS,
        payload : cartItems,
    };
}