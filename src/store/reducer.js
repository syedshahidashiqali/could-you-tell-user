import { actions } from './actions';
import initialState from './state';
const {
    SET_AUTH_USER,
    SET_AUTH_STATUS,
    ADD_SAVED_CARD,
    UPDATE_SUCCESS_POPUP,
    DELETE_SAVED_CARD,
    SET_CART_ITEMS,
    SET_COUNTRIES,
    UPDATE_CONFIRM_POPUP } = actions;
const reducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case SET_AUTH_USER:
            state = { ...state, user: payload || null }
            return state;
        case SET_AUTH_STATUS:
            state = { ...state, isLoggedIn: payload }
            return state;
        case ADD_SAVED_CARD:
            let user = state.user;
            user = { ...user, saved_cards: [...user.saved_cards, payload] };
            return { ...state, ...user };
        case UPDATE_SUCCESS_POPUP:
            return {
                ...state,
                successPopup: payload.successPopup,
                success_popup_params: payload.success_popup_params
            };
        case UPDATE_CONFIRM_POPUP:
            let data = { ...state.confirm_popup_params, ...payload }
            return {
                ...state,
                confirm_popup_params: data
            };
        case DELETE_SAVED_CARD:
            let { saved_cards } = state.user;
            saved_cards = [...saved_cards];
            let savedCardIndex = saved_cards.findIndex((item) => item._id === payload);
            saved_cards.splice(savedCardIndex, 1);
            return { ...state, user: { ...state.user, saved_cards } }
        case SET_CART_ITEMS:
            const tempState = { ...state, cartItems: payload }
            return tempState;
        case SET_COUNTRIES:
            return { ...state, countries: payload };
        default:
            return state;
    }
}


export default reducer;