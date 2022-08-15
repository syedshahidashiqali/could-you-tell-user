import { useCallback, useEffect, useMemo, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { updateConfirmPopup, updateSuccessPopup } from "../store/actions";
import event from '../Util/event';
const popupsDefaultValue = {
    confirm: {
        title: null,
        message: null,
        visibility : true,
        isConfirmed : false,
        isCanceled : false,
    }    
};
export default function useMessagePopup() {
    const dispatch = useDispatch();
    
    const successPopup = (params) => {
        dispatch(updateSuccessPopup(true,params));
    };
    const errorPopup = (params)=> {
        params.isError = true;
        dispatch(updateSuccessPopup(true,params));
      };
    const confirmPopup = useCallback((params = {})=> {
        let data = {...popupsDefaultValue.confirm};
        Object.assign(data,params);
        event.publish('showConfirmPopup',data);
    });

    return {
        successPopup,
        errorPopup,
        confirmPopup,
    };
}
