import React, { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { getUser } from '../Services/Auth'
import { getAccessToken } from '../Util/helpers';
import routes from './routes';

export default function ProtectedRoutes({children}) {
  let store = useStore();
  const state = store.getState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = getAccessToken();
    useEffect(()=>{
      
      if(!token){
        navigate({
          pathname : routes.login,
          search : createSearchParams({return : window.location.href}).toString(),
        },{
          replace : true,
        });
      }

    },[token]);
    
    return (
        <>
        {children}
        </>
  )
}
