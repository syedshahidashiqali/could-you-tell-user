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