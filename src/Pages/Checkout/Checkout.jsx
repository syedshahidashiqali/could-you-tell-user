import OrderSummary from "../../Components/OrderSummary";
import StepWizard from "react-step-wizard";
import CheckoutStep1 from "../../Components/Checkout/Step1";
import CheckoutStep2 from "../../Components/Checkout/Step2";
import CheckoutStep3 from "../../Components/Checkout/Step3";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
import { useDispatch } from "react-redux";
import { getCountries } from "../../Services/General";
import { setCountries } from "../../store/actions";
import { notification } from "../../Util/helpers";
import useMessagePopup from "../../Hooks/useMessagePopup";
import { placeOrder } from "../../Services/Order";
export default function Checkout() {
    const wizard = useRef(null);
    let [formData,setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let {successPopup,errorPopup} =  useMessagePopup();
    let [counter,setCounter] = useState(0);
    const navigateStep = ()=> {
        let wizardInfo = wizard.current;
        if(wizardInfo.currentStep == 1){
            navigate(routes.cart);
        }else{
            wizardInfo.previousStep();         
        }
    };
    
    useEffect(()=>{
        if(!formData?.billing?.hasDifferentShipping){
            let shippingAddress = {...formData?.billing};
            delete shippingAddress.hasDifferentShipping;
            setFormData({...formData,shipping: shippingAddress});            
        }
    },[formData?.billing?.hasDifferentShipping]);

    const fetchCountries = async ()=> {
        const {countries} = await getCountries();
        dispatch(setCountries(countries));
    };
    useEffect(()=> {
        fetchCountries();
    },[]);
    const submit = async (e)=> {
        e.preventDefault();
        let data = {...formData};
        try {
            let {data} = await placeOrder(data);
            successPopup({
                title : data?.message,
            });
        } catch (error) {
            errorPopup({
                title : data?.message,
            });
        }
    };
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
                                    <StepWizard ref={wizard} >
                                            <CheckoutStep1 onUpdate={(data)=> setFormData({...formData,...data})} stepName="step1" />
                                            <CheckoutStep2 data={formData} stepName="step2" />
                                    </StepWizard>
                            </div>
                        {/* ORDER SUMMARY */}
                        <OrderSummary showCheckoutBtn={wizard?.current?.currentStep == 2?true:false} btnTitle="Confirm & Pay" colClass="col-xl-4 mb-3">
                            <button type="submit" class="gold-btn-solid d-inline-block my-4 eq-width-btn me-3 px-4">Confirm & Pay</button>
                        </OrderSummary>
                    </div>
                </form>
            </div>
        </section>
    )
}
