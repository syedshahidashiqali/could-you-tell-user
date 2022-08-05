import axios from "axios";
import { buildFormData } from "../Util/helpers";

export const uploadStory = async (formData)=>{
    let fd = new FormData();
    buildFormData(fd,formData);
    try {
        
        let {data} = await axios.post('/story/user/add',fd);
        return data;
    } catch (error) {
            if(error.response){
                throw new Error(error.response?.data?.message);
            }
    }
};


export const getStories = async (params)=> {
    let {data} = await axios.get('/story/user/all',{params});
    return data;
};

export const getStoryDetail = async (id)=> {
    let {data} = await axios.get(`story/user/${id}`);
    return data;
};

