import React from 'react'

function OrderSummary() {
    return (
        <div className="col-xl-3 col-lg-4 col-md-8 mx-auto">
            <div className="grey-bg container-fluid py-3 order-summary">
                <h3 className="fs-24 mb-4">Order Summary</h3>
                <div className="row justify-content-between align-items-start ">
                    <div className="col-8 mb-5">
                        <p className="fs-14">Sub Total</p>
                    </div>
                    <div className="col-4 mb-5 text-end">
                        <p className="fs-14">$100</p>
                    </div>
                    <div className="col-8 mb-5">
                        <p className="fs-14">Total</p>
                    </div>
                    <div className="col-4 mb-5 text-end">
                        <p className="fs-14">$100</p>
                    </div>
                </div>
                <a href="checkout.php" className="gold-btn-solid d-block my-4 eq-width-btn mx-auto text-center">Proceed to Checkout</a>
            </div>
        </div>
    )
}

export default OrderSummary