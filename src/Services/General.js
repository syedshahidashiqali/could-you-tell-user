import axios from "axios";

export const updateStatus = async (route,params = null)=> {
    try{
        let {data} = await axios.post(route,params);
        return data;
    }catch(error){
        console.log(error);
        if(error.response){
            throw new Error(error.response.data?.message);
        }
    }
};


export const getCountries = async ()=> {
    try {
        let {data} = await axios.get('/user/countries'); 
        return data;
    } catch (error) {
        console.log(error);
    }
};


export const getStates = async (countryId)=> {
    try {
        let {data} = await axios.get(`/user/states/${countryId}`); 
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getCities = async (stateId)=> {
    try {
        let {data} = await axios.get(`/user/cities/${stateId}`); 
        return data;
    } catch (error) {
        console.log(error);
    }
};



export const contactUs = async (params)=> {
    try {
        let {data} = await axios.post(`/user/contact`,params); 
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

