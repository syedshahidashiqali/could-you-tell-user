import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../store/actions';
import { asset, getImage } from '../Util/helpers';

function useCart() {
    let {cartItems} = useSelector((state)=> state);
    const dispatch = useDispatch();
    
    const updateStorage = (data = [])=> {
        dispatch( setCart(data) );
        localStorage.setItem('cart',JSON.stringify(data));
    };
    useEffect(()=>{
        
        let cartData = localStorage.getItem('cart');
        
        if(cartItems.length == 0 && cartData){
            cartData = JSON.parse(cartData);
            dispatch(setCart(cartData));
        }

    },[]);
    const deleteCartItem = (index) => {
        let items = [...cartItems];
        items.splice(index,1);
        updateStorage(items);
                        
    };
    // this will update overall cart on behalf of value
    const updateCart = (value,productData,increaseQtyIfExists = false)=> {
        let cartIndex = cartItems.findIndex((item)=> item._id == productData._id);
        
        let newCartData = [...cartItems];
        
        if(value == 0 && cartIndex >= 0){
            newCartData.splice(cartIndex,1);
            updateStorage(newCartData);
            return;
        }

        if(cartIndex >= 0){
            let cartItem = {...newCartData[cartIndex]};
            if(!increaseQtyIfExists)
                cartItem.qty = value;
            else
                cartItem.qty += value;
            
            newCartData[cartIndex] = cartItem;
            updateStorage(newCartData);
            return;
        }
        
        let cartItem = {
            _id : productData?._id,
            image : asset(getImage(productData?.images,0)), 
            name : productData?.name,
            qty : value,
            price : productData?.price,
        };
        newCartData.push(cartItem);
        updateStorage(newCartData);
            
    };
    const flushCart = ()=> {
        updateStorage();
    };
  return {
    deleteCartItem,
    updateCart,
    cartItems,
    flushCart,
  };
}

export default useCart