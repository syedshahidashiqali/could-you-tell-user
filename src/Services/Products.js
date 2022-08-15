import axios from "axios";

export const getProducts = async ()=> {
    let {data} = await axios.get('/product/all');
    return data; 
}; 

export const getWishlists = async ()=> {
    let {data} = await axios.get('/product/wishlists');
    return data; 
}; 

export const getProduct = async (id)=> {
    let {data} = await axios.get(`/product/details/${id}`);
    return data; 
}; 


export const updateWishlist = async (productId)=> {
        try {
            let {data} = await axios.post(`/product/wishlist/${productId}`);
            return data;
        } catch (error) {
                if(error.response){                                                            
                    throw new Error(error?.response?.data.message);
                }
        }
};

export const truncateWishList = async ()=> {
    try {
        let {data} = await axios.delete(`/product/wishlists`);
        return data;
    } catch ({response}) {
            if(response){                                                            
                throw new Error(response?.data?.message);
            }
    }
};

export const getReviews = async (productId,params)=> {
    try {
        let {data} = await axios.get(`/product/${productId}/reviews`,{params});
        return data
    } catch (error) {
            if(error.response){                                                            
                throw new Error(error?.response?.data.message);
            }
    }
};


export const getUserReviews = async (params)=> {
    try {
        let {data} = await axios.get(`/product/user/reviews`,{params});
        return data
    } catch (error) {
            if(error.response){                                                            
                throw new Error(error?.response?.data.message);
            }
    }
};


