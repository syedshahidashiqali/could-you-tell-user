import axios from "axios"

export const storeCard = async (data)=> {
    try {
        let {data : response} = await axios({
            url : '/card/create',
            method : 'POST',
            data,
        });
        
        return response;
    } catch ({response}) {
        throw new Error(response?.data?.message);
    }
}



export const deleteCard = async (cardId)=> {
    try {
        let {data} = await axios({
            url : `/card/${cardId}`,
            method : 'DELETE',
        });        
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.toString());
    }
}

