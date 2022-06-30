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
        default:
           return state;
     }
}


export default reducer;