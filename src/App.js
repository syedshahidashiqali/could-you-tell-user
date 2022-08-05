import logo from './logo.svg';
import './App.css';
import Router from './routes/router';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getAccessToken } from './Util/helpers';
import { getUser } from './Services/Auth';
import { useEffect } from 'react';
import { setAuthStatus, setAuthUser, updateSuccessPopup } from './store/actions';
import SuccessPopup from './Components/SuccessPopup';


function App() {
  const dispatch = useDispatch(); 
  const {user, success_popup_params : successPopupParams, successPopup} = useSelector(state => state);
  useEffect(() => {
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
    </>
  );
}

export default App;
