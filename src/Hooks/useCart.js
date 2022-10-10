import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../store/actions';
import { asset, getImage } from '../Util/helpers';

function useCart() {
    let { cartItems } = useSelector((state) => state);
    const dispatch = useDispatch();

    const updateStorage = (data = []) => {
        dispatch(setCart(data));
        localStorage.setItem('cart', JSON.stringify(data));
    };

    useEffect(() => {
        let cartData = localStorage.getItem('cart');
        if (cartItems.length == 0 && cartData) {
            cartData = JSON.parse(cartData);
            dispatch(setCart(cartData));
        }
        console.log("newCartData", cartData)
    }, []);

    const deleteCartItem = (index) => {
        let items = [...cartItems];
        items.splice(index, 1);
        updateStorage(items);

    };

    const checkAttribs = (attribs1, attribs2) => {
        var res = true;
        attribs1.forEach((attrib) => {
            const attrib2Obj = attribs2.find(e => e.attributeId === attrib.attributeId);
            if (attrib2Obj.value._id !== attrib.value._id) {
                console.log(38, "line")
                res = false;
            }
        })
        return res;
    }

    // this will update overall cart on behalf of value
    const updateCart = (value, productData, increaseQtyIfExists = false) => {
        let newCartData = [...cartItems];
        console.log(newCartData, "newCartData", productData);

        let cartIndex = newCartData.findIndex((item) => item._id === productData._id
            && checkAttribs(item.attributes, productData.attributes));

        if (value == 0 && cartIndex >= 0) {
            newCartData.splice(cartIndex, 1);
            updateStorage(newCartData);
            return;
        }
        // if item is already in cart then update cart item value
        if (cartIndex >= 0) {
            let cartItem = { ...newCartData[cartIndex] };
            if (!increaseQtyIfExists)
                cartItem.qty = value;
            else
                cartItem.qty += value;

            newCartData[cartIndex] = cartItem;
            updateStorage(newCartData);
            return;
        }

        let cartItem = {
            _id: productData?._id,
            image: asset(getImage(productData?.images, 0)),
            name: productData?.name,
            qty: value,
            price: productData?.price,
            attributes: productData.attributes,
        };
        newCartData.push(cartItem);
        updateStorage(newCartData);

    };

    const flushCart = () => {
        updateStorage();
    };

    const getVariation = (attributes, defaultPrice = 0) => {
        let variation = (attributes.length > 0)
            ?
            (attributes[0]?.value?.price || 0 + attributes[1]?.value?.price || 0)
            : defaultPrice;
        // console.log(variation,attributes);
        return parseInt(variation || defaultPrice);
    };
    return {
        deleteCartItem,
        updateCart,
        cartItems,
        flushCart,
        getVariation
    };
}

export default useCart