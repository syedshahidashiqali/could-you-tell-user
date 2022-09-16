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
            throw new Error(error?.response?.data?.message);
        }
};


export const getInvitees = async (id)=> {
    try {
        let {data} = await axios.get(`event/${id}/invites`);
        return data;
    } catch (error) {
        
    }
};

export const getAttendees = async (id)=> {
    try {
        let {data} = await axios.get(`event/${id}/attendees`);
        return data;
    } catch (error) {
        
    }
};

export const deleteInvitee = async (id)=> {
    try {
        let {data} = await axios.delete(`event/${id}/invitee`);
        return data;
    } catch (error) {
        
    }
};

export const updateRoom = async (id,formData)=> {
    try {
        let {data} = await axios.post(`/event/user/${id}/update-room`,formData);
        return data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const checkIsInvitee = async (id)=> {
    try {
        let {data} = await axios.post(`/event/${id}/check-invitee`);
        return data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    } 
};


export const inviteStatus = async (id,status)=> {
    try {
        let {data} = await axios.post(`/event/${id}/change-invite-status`,{status});
        return data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);
    }
};

export const completeEvent = async (id)=> {
    
    try {
        let {data} = await axios.post(`/event/${id}/end`);
        return data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);        
    }

};

export const uploadMedia = async (id,file)=> {
    try {
        let fd = new FormData();
        buildFormData(fd,file);
        let {data} = await axios.post(`/event/${id}/upload-media`,fd); 
        return data;
    } catch (error) {
        throw new Error(error?.response?.data?.message);                
    }
};