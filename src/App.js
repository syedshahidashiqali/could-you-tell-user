import logo from './logo.svg';
import './App.css';
import Router from './routes/router';
import Navbar from './Layouts/Navbar';
import Footer from './Layouts/Footer';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { getAccessToken } from './Util/helpers';
import { getUser } from './Services/Auth';
import { useEffect } from 'react';
import { setAuthStatus, setAuthUser } from './store/actions';


function App() {
  const dispatch = useDispatch(); 
  const {user} = useSelector(state => state);

  useEffect(() => {
    console.log(getAccessToken());
      if(!user && getAccessToken()){
        console.log('asasdasd',user);
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
    </>
  );
}

export default App;
