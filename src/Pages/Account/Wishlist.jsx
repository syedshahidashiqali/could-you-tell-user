import React, { useState } from 'react'
import { useEffect } from 'react';
import NoRecord from '../../Components/NoRecord';
import useCart from '../../Hooks/useCart';
import useMessagePopup from '../../Hooks/useMessagePopup';
import { getWishlists, truncateWishList } from '../../Services/Products';
import { asset, getImage, notification } from '../../Util/helpers';

function Wishlist() {
    const [wishlists, setWishlists] = useState({
        data : [],
    });
    let {updateCart} = useCart();
    let {confirmPopup,errorPopup,successPopup} = useMessagePopup();
    const fetch = async (page = 1) => {
        let data = await getWishlists({ page });
        setWishlists(data);
    };
    const addtoCart = (qty,item)=>{
        updateCart(qty,item,true);
        notification('Cart Updated');
    }
    const addAlltoCart = ()=> {
        wishlists?.data?.forEach(element => {
            updateCart(1,element?.product,true);
        });
        notification('Cart Updated');

    }

    const onClearWishlist = async ()=> {
        confirmPopup({
            message : 'Are you sure you want to remove from wishlist?',
            onConfirm : async ()=> {
                try {
                    let {message} = await truncateWishList();
                    successPopup({
                        message,
                    })
                    setWishlists({
                        data : [],
                    });
                } catch (error) {
                    console.log(error);
                    errorPopup({
                        message : error?.message,
                    });
                }
            },
            onCancel : ()=> {
                // alert('cancelled')
            },
        });
        
    };
    useEffect(() => {
        fetch();
    }, []);
    
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-4 align-items-center">
                    <div className="col-12 text-start mb-4">
                        <h1 className="heading-lvl-one mb-2 d-flex align-items-center">  My Wishlist</h1>
                    </div>
                    <div className="col-lg-8">
                        {
                           (wishlists?.data?.length == 0)?
                           <NoRecord>
                            <h1>No Data Available</h1>
                           </NoRecord>
                           : 
                            <div className="row justify-content-between align-items-center">
                                <div className="col-6 mb-3">
                                    <button onClick={()=> onClearWishlist()} className="btn grey-text bg-transparent" id="clearWishlist">Clear Wishlist</button>
                                </div>
                                <div className="col-6 mb-3 text-end">
                                    <button onClick={(e)=> addAlltoCart()} className="btn grey-text bg-transparent" id="addAllToCart" data-bs-toggle="modal" data-bs-target="#addToCart">Add All To Cart</button>
                                </div>
                                <div className="col-12 mt-4">
                                    <div className="table-responsive">
                                        <table className="table table-borderless" id="wishlist-table">
                                            <tbody>
                                                {
                                                    wishlists?.data?.map((item,itemIndex) => (
                                                        <tr key={itemIndex}>
                                                            {/* checkbox */}
                                                            <td>

                                                            {/*  <div className="form-group form-check">
                                                                    <input type="checkbox" className="form-check-input" id="wishlist-item-check-1" />
                                                                </div> */}
                                                            </td>
                                                            {/* product image */}
                                                            <td>
                                                                <div className="wishlist-item-img">
                                                                    <img crossOrigin='anonymous' src={asset(getImage(item?.product?.images,0))} alt="" className="img-fluid" />
                                                                </div>
                                                            </td>
                                                            {/* product title */}
                                                            <td>
                                                                <p className="item-title">{item?.product?.name}</p>
                                                            </td>
                                                            {/* product price */}
                                                            <td>
                                                                <p className="item-price">${item?.product?.price}</p>
                                                            </td>
                                                            {/* add to cart button */}
                                                            <td className="text-end">
                                                                <button onClick={()=> addtoCart(1,item?.product)} type="button" className="btn gold-btn-solid d-inline-block eq-width-btn" data-bs-toggle="modal" data-bs-target="#addToCart">Add To Cart</button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Wishlist