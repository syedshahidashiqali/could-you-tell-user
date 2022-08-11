import React from 'react'
import useStepForm from '../../Hooks/useStepForm'

function CheckoutStep3(props) {
    let {changeStep} = useStepForm(props);
    return (
        <>
            <div className="dark-grey-bg p-4 mb-5">
                <div className="row justify-content-between">
                    <div className="col-md-9 mb-3 order-2 order-md-1">
                        <h3 className="heading-lvl-three mb-4">Ship To</h3>
                        <ul className="grey-text">
                            <li className="mb-2">Mark Carson</li>
                            <li className="mb-2">ABC Road</li>
                            <li className="mb-2">United States</li>
                            <li className="mb-2">abc@xyz.com</li>
                            <li className="mb-2">(000-00-0000)</li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-3 text-end order-1 order-md-2">
                        <a href="#" className="green-link font-weight-lighter">Change</a>
                    </div>
                </div>
            </div>
            <div className="col-12">
                <a onClick={()=> changeStep()} className="cursor gold-btn-solid d-inline-block text-center eq-width-btn me-3 px-4">Continue</a>
            </div>
        </>

    )
}

export default CheckoutStep3