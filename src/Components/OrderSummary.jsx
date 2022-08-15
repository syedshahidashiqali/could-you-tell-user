import { reverse } from 'named-urls';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../routes/routes';
function OrderSummary({colClass,showCheckoutBtn,btnTitle,children}) {
    let {cartItems} = useSelector(state => state);
    const getTotal = ()=> {
        let total = cartItems.reduce((prev,current)=> prev += (current.price * current.qty) ,0);
        return total;
    };
    return (
        <div className={colClass}>
            <div className="grey-bg container-fluid py-3 order-summary">
                <h3 className="fs-24 mb-4">Order Summary</h3>
                <div className="row justify-content-between align-items-start ">
                    <div className="col-8 mb-5">
                        <p className="fs-14">Sub Total</p>
                    </div>
                    <div className="col-4 mb-5 text-end">
                        <p className="fs-14">${getTotal()}</p>
                    </div>
                    <div className="col-8 mb-5">
                        <p className="fs-14">Total</p>
                    </div>
                    <div className="col-4 mb-5 text-end">
                        <p className="fs-14">${getTotal()}</p>
                    </div>
                </div>
                {
                showCheckoutBtn?
                    <Link to={routes.checkout} className="gold-btn-solid d-block my-4 eq-width-btn mx-auto text-center">{btnTitle}</Link>
                    :children
                }
            </div>
        </div>
    )
}
OrderSummary.defaultProps = {
    colClass : 'col-xl-3 col-lg-4 col-md-8 mx-auto',
    showCheckoutBtn : true,
    btnTitle : 'Proceed to Checkout',
};
export default OrderSummary