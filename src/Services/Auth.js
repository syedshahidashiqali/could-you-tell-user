import axios from 'axios';
import { notification, removeAccessToken, setAccessToken } from '../Util/helpers';

export const login = async (formData)=> {
    try {            
        let {data} = await axios.post('auth/user/login',formData);
        
        notification(data.message);
        setAccessToken(data.token);
        return data;
    } catch (error) {
        notification(error.response.data.message,'error');
        console.log(error);
    }
};

export const register = async (formData)=> {
    try {            
        let {data} = await axios.post('auth/user/register',formData);
        
        notification(data.message);
        return data;
    } catch (error) {
        notification(error.response.data.message,'error');
        console.log(error);
    }
};


export const logout = async ()=> {
    try {            
        // let {data} = await axios.post('auth/user/logout',formData);
        
        removeAccessToken();
        notification('logout successfully');
        setTimeout(()=> window.location.reload(),2000);
        // return data;
    } catch (error) {
        notification(error.response.data.message,'error');
        console.log(error);
    }
};


export const getUser = async ()=> {
    let {data} = await axios.get('account');
    return data;
};



export const recoverPassword = async (formData) =>{

  try {
    let {data} = await axios({
        url: `auth/recover`,
        method: "POST",
        data : formData,
        });
        notification(data?.message);
        return data;
  } catch (error) {
        notification(error?.response?.data?.message,'error');
        console.log(error);
  }
};


export const verifyCode =  async (data) =>{
    try {
        
        let {data : response} = await axios({
            url: `auth/verify`,
            method: "POST",
            data,
        });
        notification(response.message);
        return response;
    } catch (error) {
        console.log(error);
        notification(error?.response?.data?.message);
    }
}

export const resetPassword = async (data) =>
 {
    try {
        let {data : response} = await axios({
            url: `auth/reset`,
            method: "POST",
            data,
          });
          notification(response.message);
        return response;
    } catch (error) {
        notification(error?.response?.data?.message);
            console.log(error);
    }
 }