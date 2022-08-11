import axios from "axios"

export const placeOrder = async (formData)=> {
        try {
            let {data} = await axios.post('/order/place-order',formData);
        } catch (error) {
            if(!error?.response){
                throw new Error(error?.response?.data?.message);
            }
        }
}