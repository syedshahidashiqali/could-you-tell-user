import axios from "axios"
import { buildFormData } from "../Util/helpers";

export const createList = async (data)=> {
        let {data : response} = await axios({
            url : 'invitees/',
            method : 'POST',
            data,
        });

        return response;
}

export const updateList = async (id,data)=> {
    let {data : response} = await axios({
        url : `invitees/${id}`,
        method : 'POST',
        data,
    });

    return response;
}


export const getLists = async ()=> {
    let {data} = await axios({
        url : 'invitees/',
        method : 'GET',
    });

    return data;
}

export const getList = async (listId)=> {
    let {data} = await axios({
        url : `invitees/${listId}`,
        method : 'GET',
    });

    return data;
}


