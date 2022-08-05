import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PaymentPopup from '../../Components/PaymentPopup';
import routes from '../../routes/routes';
import { getPlans } from '../../Services/Plans';

export default function Subscriptions() {
    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState({});

    const fetch = async () => {
        let data = await getPlans();
        setPlans(data.packages);
    };

    useEffect(() => {
        fetch()
    }, []);

    return (
        <section className="virtual-events text-offwhite">
            <div className="container py-5">
                <div className="row">
                    <div className="col-lg-12 text-start mb-5">
                        <h1 className="heading-lvl-one font-weight-light">Subscription Plans</h1>
                        <p className="font-weight-light">Subscribe to one of our subscription plans to avail the best of our services</p>
                    </div>
                </div>
                <div className="row justify-content-center align-items-start px-lg-5 px-3">
                    {
                        plans?.map((item,itemIndex) => (
                            <div key={itemIndex} className="col-xl-4 col-lg-5 col-md-6 col-sm-9 my-4">
                                <div className="plan-card text-center" id="plan1">
                                    <h3 className="plan-price">{item.amount} <span className="cents">00</span></h3>
                                    <p>{item.duration} Month</p>
                                    <div className="plan-features mt-4">
                                        <h4 className="plan-title mb-3">{item.name}</h4>
                                        <ul className="feature-list">
                                            <li className="pckg__includes">Package Feature # 01</li>
                                            <li className="pckg__includes">Package Feature # 02</li>
                                            <li className="pckg__includes">Package Feature # 03</li>
                                            <li className="pckg__not__includes">Package Feature # 04</li>
                                            <li className="pckg__not__includes">Package Feature # 05</li>
                                        </ul>
                                        <Link to={reverse(routes.subscriptionPayment,{plan : item._id})} className="btn gold-btn-solid d-inline-block mt-4 eq-width-btn">Select Plan</Link>
                                        {/* <button type="button" className="btn grey-btn-solid d-inline-block mt-4 eq-width-btn">Select Plan</button> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* <PaymentPopup paymentDetail={selectedPlan} /> */}
            </div>
        </section>

    )
}
