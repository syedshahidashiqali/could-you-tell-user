import OrderSummary from "../../Components/OrderSummary";
import StepWizard from "react-step-wizard";
import CheckoutStep1 from "../../Components/Checkout/Step1";
import CheckoutStep2 from "../../Components/Checkout/Step2";
import CheckoutStep3 from "../../Components/Checkout/Step3";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
import { useDispatch } from "react-redux";
import { getCountries } from "../../Services/General";
import { setCountries } from "../../store/actions";
import { notification } from "../../Util/helpers";
import useMessagePopup from "../../Hooks/useMessagePopup";
import { placeOrder } from "../../Services/Order";
import useCart from "../../Hooks/useCart";
export default function Checkout() {
    let [formData,setFormData] = useState({});
    let wizard = useRef(null);
    let [activeStep,setActiveStep] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let {successPopup,errorPopup} =  useMessagePopup();
    let {cartItems,flushCart} = useCart();
    
    const navigateStep = ()=> {
        let wizardInfo = wizard.current;
        if(wizardInfo.currentStep == 1){
            navigate(routes.cart);
        }else{
            wizardInfo.previousStep();         
        }
    };

    const fetchCountries = async ()=> {
        const {countries} = await getCountries();
        dispatch(setCountries(countries));
    };
    useEffect(()=> {
        fetchCountries();
    },[]);
    const submit = async (e)=> {
        e.preventDefault();
        let products = cartItems.map(item=>({productId : item._id, qty : item.qty,price : item.price  }));
        // if shipping is not set then add billing as shipping
        let shipping = formData?.billing?.hasDifferentShipping?formData?.shipping:formData?.billing;
        // creating data object for api
        let data = {...formData,products,shipping};
        
        try {
            let {message} = await placeOrder(data);
            successPopup({
                title : message,
            });
            // remove cart values;
            flushCart();
            // 
            navigate(routes.orders.index);
        } catch (error) {
            console.log(error);
            errorPopup({
                message : error?.message,
            });
        }
    };
    const onRefChange = useCallback(({previousStep,activeStep}) => {
            setActiveStep(activeStep);
    });
    
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-4 align-items-center">
                    <div className="col-12 text-start mb-4">
                        <h1 className="heading-lvl-one mb-2 d-flex align-items-center">
                            <a onClick={()=> navigateStep()} className="cursor back-link"><i className="fas fa-chevron-left text-white" /></a>Checkout
                        </h1>
                    </div>
                </div>
                <form onSubmit={(e)=> submit(e)} id="cut-form">
                    <div className="row justify-content-between align-items-start">
                            <div className="col-xl-8 mb-3">
                                    <StepWizard onStepChange={(previousStep,activeStep)=> onRefChange(previousStep,activeStep)} ref={wizard} >
                                            <CheckoutStep1 onUpdate={(data)=> setFormData({...formData,...data})} stepName="step1" />
                                            <CheckoutStep2 data={formData} stepName="step2" />
                                    </StepWizard>
                            </div>
                        {/* ORDER SUMMARY */}
                        {}
                        <OrderSummary showCheckoutBtn={false} btnTitle="Confirm & Pay" colClass="col-xl-4 mb-3">
                            {activeStep == 2?
                                <button type="submit" class="gold-btn-solid d-inline-block my-4 eq-width-btn me-3 px-4">Confirm & Pay</button>
                            :''
                            }
                        </OrderSummary>
                    </div>
                </form>
            </div>
        </section>
    )
}
