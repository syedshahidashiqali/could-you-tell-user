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