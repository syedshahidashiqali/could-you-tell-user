import React from 'react'
import { useSelector } from 'react-redux';
import useCart from '../Hooks/useCart'
import useMessagePopup from '../Hooks/useMessagePopup';
import Incremeter from './Incremeter';

export default function CartItems() {
    let {cartItems} = useSelector(state=> state);
    let {updateCart, deleteCartItem,flushCart,getVariation } = useCart();
    let {confirmPopup} = useMessagePopup();
    const onDeleteCartItem = (itemIndex)=> {
        confirmPopup({
            message : 'Are you sure? do you want to remove this item',
            onConfirm : ()=> deleteCartItem(itemIndex),
        })
    };
    return (
        <div className="col-xl-9 col-lg-8 pe-3">
            <div className="row">
                <div className="col-6 mb-3">
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="selectAll" />
                        <label className="form-check-label" htmlFor="selectAll">Select All ({cartItems.length})</label>
                    </div>
                </div>
                <div className="col-6 text-end mb-3">
                    <button onClick={()=>  flushCart()} type="button" id="removeCartItems" className="border-0 bg-transparent text-white"><i className="far fa-trash-alt me-2" /> Remove</button>
                </div>
                <div className="col-lg-12 mb-5">
                    <div className="table-responsive text-start">
                        <table className="table table-borderless text-start" id="wishlist-table">
                            <tbody>
                                {
                                    cartItems?.map((item, itemIndex) => (
                                        <tr key={itemIndex}>
                                            <td>
                                                <div className="form-group form-check">
                                                    <input type="checkbox" className="form-check-input" id="cartItem-2" />
                                                    <label className="form-check-label" htmlFor="cartItem-2" />
                                                </div>
                                            </td>
                                            {/* product image */}
                                            <td>
                                                <div className="wishlist-item-img">
                                                    <img src={item.image} crossOrigin='anonymous' width="80" draggable="false" alt="" className="img-fluid border-radius-0" />
                                                </div>
                                            </td>
                                            {/* product title */}
                                            <td>
                                                <div className="order-item-detail">
                                                    <p className="item-title mb-2">{item?.name}</p>
                                                    {/* <p className="item-color mb-2">Color: <span className="bg-red ms-1" /></p> */}
                                                    
                                                    {
                                                        item?.attributes?.map((attribute,attributeIndex)=>(
                                                            <p className="item-price">{attribute?.label}: <span className="ms-1">{attribute?.value?.name}</span> </p>
                                                        ))
                                                    }
                                                </div>
                                            </td>
                                            {/* product Quantity */}
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <p>Qty:</p>
                                                    <Incremeter
                                                        onDecrement={(value) => updateCart(value, item)}
                                                        onIncrement={(value) => updateCart(value, item)}
                                                        defaultValue={item?.qty}
                                                    />
                                                </div>
                                            </td>
                                            {/* Status */}
                                            <td>
                                                <p className="cost">Cost: <span>${getVariation(item?.attributes,item?.price)}</span></p>
                                            </td>
                                            <td>
                                                <a onClick={() => onDeleteCartItem(itemIndex)} href="#" className="text-white text-decoration-none"><i className="far fa-trash-alt red fa-2x" /></a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
