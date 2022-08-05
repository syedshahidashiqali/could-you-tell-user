import { useSelector } from "react-redux"
import CartItems from "../../Components/CartItems";
import Incremeter from "../../Components/Incremeter";
import OrderSummary from "../../Components/OrderSummary"
import useCart from "../../Hooks/useCart";

function Cart() {
    let {cartItems} = useCart();
    // let cartItems = [];
    return (
        <section className="virtual-events text-white">
            {/* container starts */}
            <div className="container py-5">
                {/* row starts */}
                <div className="row">
                    <div className="col-12 my-5">
                        <h1 className="heading-lvl-one">Cart</h1>
                    </div>
                    <div className="col-12">
                        <div className="cut-tabs">
                            {/* DELIVERED ORDERS */}
                            <div className="row justify-content-between align-items-start mb-5">
                                {
                                    cartItems?.length > 0?
                                        <>
                                        <CartItems/>
                                        <OrderSummary />
                                    </>
                                    :
                                    <div className="text-center">
                                        <img style={{width : '250px'}} src="images/basket.svg"/>
                                        <h1>Cart Is Empty!</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* row ends */}
            </div>
            {/* containter ends */}
        </section>

    )
}

export default Cart