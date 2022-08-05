import axios from "axios"
import { buildFormData } from "../Util/helpers";

export const getEvents = async (params)=> {
    try {
        let {data} = await axios.get('/event/my',{
            params : params,
        });

        return data;
    } catch (error) {
        throw new Error(error.toString());
    }
}


export const getEvent = async (id)=> {
    try {
        let {data} = await axios.get(`/event/${id}`);
        // console.log(data);
        return data;
    } catch (error) {
        throw new Error(error.toString());
    }
}


export const sendInvite = async (data)=> {
    // console.log(data);
    // let fd = new FormData();
    // buildFormData(fd,data);
    try {
        let {data : res} = await axios.post(`event/${data.eventId}/invite`,data);
        return res;
    } catch (error) {
        
        throw new Error(error.toString());
    }
}


export const updateEvent = async (id,formData)=> {
        try {
            let fd = new FormData();
            buildFormData(fd,formData);
            let {data} = await axios.post(`/event/${id}`,fd);
            return data;
        } catch (error) {
            throw new Error(error?.data?.message);
        }
};