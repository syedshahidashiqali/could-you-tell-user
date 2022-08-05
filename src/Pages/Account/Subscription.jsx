import { useRef } from "react";
import { useEffect, useState } from "react";
import Table from "../../Components/Table";
import TableSearch from "../../Components/TableSearch";
import { getMySubscription } from "../../Services/Auth";
import { getPlans } from "../../Services/Plans";
import { format_date } from "../../Util/helpers";

export default function MySubscriptions() {
    const [plans, setPlans] = useState({});
    const [packages, setPackages] = useState([]);
    const [filterValues, setFilterValues] = useState({
        package_id : '',
    });
    const [filterOptions,setFilterOptions] = useState([
        {
            id : '',
            label : 'Select Subscription Plan',
        },
    ]);
    
    const fields = useRef([
        {
            label : 'Subscription Plan',
            key : 'package',
            format : (value)=> value.name, 

        },
        {
            label : 'Subscribed on',
            key : 'createdAt',
            format : format_date, 
        },
        {
            label : 'Expiry Date',
            key : 'renewal_date',
            format : format_date,
            
        },
        {
            label : 'Amount paid',
            key : 'subscription_price',
            format : (value)=> `$${value}`,
            
        },
    ]);
    const fetch = async (page = 1)=> {
            let plans = await getMySubscription({...filterValues,page});
            setPlans(plans);
    };
    const fetchPackages = async (page = 1)=> {
            let {packages : packagesData} = await getPlans();
            const options = [];
            packagesData.forEach((item)=> {
                options.push({id : item._id, label : item.name});
            });
            setFilterOptions([...filterOptions,...options]);
    };
    useEffect(()=> {
        if(plans?.data == undefined){            
            fetchPackages();
        }
        fetch();
    },[filterValues?.package_id,filterValues?.search]);
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-xxl-8 col-lg-9 text-start">
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">Subscription</h1>
                        <h3 className="text-white fs-26 mb-3 font-weight-light">Current Subscription</h3>
                        <div className="profile-details mt-4 pb-2">
                            <div className="row align-items-start mb-2">
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Package Type */}
                                    <h5 className="grey-text">Package Type</h5>
                                    <p className="silver-text font-weight-400">Virtual Room</p>
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Subscribed On */}
                                    <h5 className="grey-text">Subscribed On</h5>
                                    <p className="silver-text font-weight-400">Sept 27, 2021</p>
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Expires On */}
                                    <h5 className="grey-text">Expires On</h5>
                                    <p className="silver-text font-weight-400">Sept 26, 2022</p>
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Amount Paid */}
                                    <h5 className="grey-text">Amount Paid</h5>
                                    <p className="silver-text font-weight-400">$200</p>
                                </div>
                            </div>
                            <div className="row align-items-start mb-4 border-top border-silver pt-4">
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Package Type */}
                                    <h5 className="grey-text">Package Type</h5>
                                    <p className="silver-text font-weight-400">Stories</p>
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Subscribed On */}
                                    <h5 className="grey-text">Subscribed On</h5>
                                    <p className="silver-text font-weight-400">Sept 27, 2021</p>
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Expires On */}
                                    <h5 className="grey-text">Expires On</h5>
                                    <p className="silver-text font-weight-400">Sept 26, 2022</p>
                                </div>
                                <div className="col-lg-3 col-sm-6 mb-4">
                                    {/* Amount Paid */}
                                    <h5 className="grey-text">Amount Paid</h5>
                                    <p className="silver-text font-weight-400">$200</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        {/* Table starts here */}
                            <form id="cut-table-form">

                                <TableSearch 
                                onSearch={(value)=> setFilterValues({...filterValues,search : value})}
                                onFilterChange={(value)=> setFilterValues({...filterValues,package_id : value})}
                                 filterValues={filterOptions}/>
                            </form>
                        <div className="grey-bg container-fluid px-0">
                            <Table data={plans} fields={fields.current} />
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
