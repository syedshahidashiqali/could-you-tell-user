import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer, toast } from 'react-toastify';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import './Util/axios';
import { Provider } from 'react-redux';
import reducer from './store';
import { configureStore } from '@reduxjs/toolkit';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router key={window.location.href} basename='/could-you-tell/user'>
        <App />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
