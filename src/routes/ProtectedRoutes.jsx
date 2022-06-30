import React, { useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../Services/Auth'
import { getAccessToken } from '../Util/helpers';

export default function ProtectedRoutes({children}) {
  let store = useStore();
  const state = store.getState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = getAccessToken();
    useEffect(()=>{
      
      if(!token){
        navigate('/login',{replace : true});
      }

    },[token]);
    
    return (
        <>
        {children}
        </>
  )
}
