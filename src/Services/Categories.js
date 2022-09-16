import axios from "axios"

export const eventCategories = async ()=>{
    let {data} = await axios({
        url : 'eventCategory/user/categories/all',
        method : "GET",
    });
    return data;
}




export const eventCategory = async (categoryId)=>{
    let {data} = await axios({
        url : `eventCategory/user/categories/${categoryId}`,
        method : "GET",
    });
    return data;
}


export const storeEvent = async (data)=>{
    let {data : response} = await axios({
        url : `event/user/host`,
        method : "POST",
        data
    });
    return response;
}


export const getCategories = async (data)=>{
    let {data : response} = await axios.get('category/user/all',{
        params : data,
    });
    return response;
}


export const getStoryCategories = async (data)=>{
    let {data : response} = await axios.get('category/story',{
        params : data,
    });
    return response;
}




export const getStoryCategory = async (id)=>{
    let {data : response} = await axios.get(`storyCategory/user/${id}`);
    return response;
}


export const getProductSubCategories = async (id)=>{
    let {data} = await axios.get(`/category/sub-categories/${id}`);    
    return data;
};