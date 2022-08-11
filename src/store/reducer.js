import { actions } from './actions';
import initialState from './state';

const reducer =  (state = initialState,action)=>{
    switch (action.type) {
        case actions.SET_AUTH_USER:
            state = {...state,user : action.payload || null}  
            return state;
        case actions.SET_AUTH_STATUS:
            state = {...state, isLoggedIn : action.payload}  
            return state;
        case actions.ADD_SAVED_CARD:
            let user = state.user;
            user = {...user,saved_cards : [...user.saved_cards,action.payload]};
            return {...state,...user};
        case actions.UPDATE_SUCCESS_POPUP:
            return {
                ...state, 
                successPopup : action.payload.successPopup,
                success_popup_params : action.payload.success_popup_params
            };
        case actions.DELETE_SAVED_CARD: 
            let {saved_cards} = state.user;
            saved_cards = [...saved_cards];
            let savedCardIndex = saved_cards.findIndex((item)=> item._id === action.payload);
            saved_cards.splice(savedCardIndex,1);
            return {...state,user : {...state.user, saved_cards}}
        case actions.SET_CART_ITEMS:                    
            return {...state,cartItems : action.payload};
        case actions.SET_COUNTRIES:                    
            return {...state,countries : action.payload};
        default:
           return state;
     }
}


export default reducer;