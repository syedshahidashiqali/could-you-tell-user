import logo from './logo.svg';
import './App.css';
import Router from './routes/router';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getAccessToken } from './Util/helpers';
import { getUser } from './Services/Auth';
import { useEffect, useState } from 'react';
import { setAuthStatus, setAuthUser, updateConfirmPopup, updateSuccessPopup } from './store/actions';
import SuccessPopup from './Components/SuccessPopup';
import ConfirmPopup from './Components/Popups/ConfirmPopup';
import event from './Util/event'; 

function App() {
  const dispatch = useDispatch(); 
  const {
    user, 
    successPopup,
    success_popup_params : successPopupParams, 
  } = useSelector(state => state);
  
  const [confirmPopupParams, setConfirmPopupParams] = useState({
    visibility : false,
  });

  const showConfirmPopupHandler = (event)=> {
    setConfirmPopupParams(event.detail);
  };
  
  const handler = (callback)=> {
    confirmPopupParams[callback]();    
    setConfirmPopupParams({visibility : false});
  };
  useEffect(() => {
    // subscribing custom event
    event.subscribe('showConfirmPopup',showConfirmPopupHandler);
      
      if(!user && getAccessToken()){
        (async () => {
          let { user }  = await getUser();
          dispatch(setAuthStatus(true));
          dispatch(setAuthUser(user));
        })();
      }
      
      
    }, []);
  return (
    <>
    <Navbar />
    <Router />
    <Footer />
    <SuccessPopup 
        isError={successPopupParams.isError} 
        active={successPopup} 
        closed={()=> dispatch(updateSuccessPopup(false,{}))} 
        title={successPopupParams.title} 
        message={successPopupParams.message} 
        delay={successPopupParams.delay}>
    </SuccessPopup>
    <ConfirmPopup
        active={confirmPopupParams?.visibility}
        onConfirm={()=> handler('onConfirm')}
        onCancel={()=> handler('onCancel')}
        message={confirmPopupParams?.message}
        
    />
    </>
  );
}

export default App;
