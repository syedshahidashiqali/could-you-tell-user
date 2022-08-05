import {useDispatch} from "react-redux";
import { updateSuccessPopup } from "../store/actions";
export default function useMessagePopup() {
    const dispatch = useDispatch();
    
    const successPopup = (params) => {
        dispatch(updateSuccessPopup(true,params));
    };
    const errorPopup = (params)=> {
        params.isError = true;
        dispatch(updateSuccessPopup(true,params));
      };
    return {
        successPopup,
        errorPopup,
    };
}
