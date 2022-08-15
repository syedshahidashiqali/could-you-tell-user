import axios from "axios"

export const placeOrder = async (formData)=> {
        try {
            let {data} = await axios.post('/order/place-order',formData);
            return data;
        } catch ({response}) {
            if(response){
                throw new Error(response?.data?.message);
            }
        }
}


export const getOrders = async (params)=> {
    try {
        let {data} = await axios.get('/order/my',{params});
        return data;
    } catch ({response}) {
        if(response){
            throw new Error(response?.data?.message);
        }
    }
};

export const getOrder = async (orderId)=> {
    try {
        let {data} = await axios.get(`/order/${orderId}`);
        return data;
    } catch ({response}) {
        if(response){
            throw new Error(response?.data?.message);
        }
    }
};