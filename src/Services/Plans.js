import axios from "axios"

export const getPlans = async (params)=> {
    let {data} = await axios.get('/subscription/all',{params : params});
    return data;
}

export const getPlan = async (id)=> {
    let {data} = await axios.get(`/subscription/${id}`);
    return data;
}


export const subscribePackage = async (params)=> {
    try {
        let {data} = await axios.post('/subscription/user/subscribe',params);
        return data;
    } catch (error) {
        if(error.response){
            const {message} = error.response.data;
            throw new Error(message);
        }
    }
};