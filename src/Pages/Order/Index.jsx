import { reverse } from "named-urls";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../Components/Pagination";
import Table from "../../Components/Table";
import routes from "../../routes/routes";
import { getOrders } from "../../Services/Order";
import { orders as tableFields } from "../../Util/table-fields";

function OrderIndex() {
    const [orders, setOrders] = useState({
        data: [],
    });
    let statusBadges = {
        Pending : 'bg-pending',
        Delivered : 'bg-green',
        'In Process' : 'bg-pink',
    };
    const [filterValues,setFilterValues] = useState({})
    const fetch = async (page = 1) => {
        const data = await getOrders({ page,...filterValues });
        setOrders(data);
    };
    useEffect(() => {
        fetch();
    },[filterValues]);
    return (
        <section className="virtual-events text-white">
            {/* container starts */}
            <div className="container py-5">
                {/* row starts */}
                <div className="row">
                    <div className="col-12 my-5">
                        <h1 className="heading-lvl-one">My Orders</h1>
                    </div>
                    <div className="col-sm-3">
                        <div className="cut-tabs">
                            <ul id="tab-links">
                                <li><a onClick={()=> setFilterValues({...filterValues,status : null})} className={`cursor ${!filterValues.status?'active':''}`}>All</a></li>
                                <li><a onClick={()=> setFilterValues({...filterValues,status : 'Pending'})} className={`cursor ${filterValues.status == 'Pending'?'active':''}`}>Pending</a></li>
                                <li><a onClick={()=> setFilterValues({...filterValues,status : 'In Process'})} className={`cursor ${filterValues.status == 'In Process'?'active':''}`}>In Process</a></li>
                                <li><a onClick={()=> setFilterValues({...filterValues,status : 'Delivered'})} className={`cursor ${filterValues.status == 'Delivered'?'active':''}`}>Delivered</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="cut-tabs">
                            {/* ALL ORDERS */}
                            <div className="row justify-content-between align-items-center mb-5">
                                {/* ORDER ENTRY ONE */}
                                <div className="col-md-6 mb-3"></div>
                                <div className="col-lg-4 col-md-6 text-end mb-3">
                                    <form id="cut-form">
                                        <div className="d-flex align-items-center">
                                            <label className="mb-2 nowrap grey-text" htmlFor="country">Sort by</label>
                                            <select defaultValue={'descending'} onChange={(e)=> setFilterValues({...filterValues,order : e.target.value})} className="form-select form-field py-sm-2 py-1 ms-2 grey-text" aria-label="country or region">
                                                <option value={'ascending'}>Ascending</option>
                                                <option value={'descending'}>Descending</option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                {/* ORDER ENTRY TWO */}
                                <div className="col-12 mb-5">
                                    <Table fields={tableFields} data={orders}
                                    extraHeads={()=> (
                                        <>
                                        <th>Status</th>
                                        <th>Action</th>
                                        </>
                                    )}
                                    extraCells={(item)=>(
                                        <>
                                            <td>
                                                <span className={`status-tag ${statusBadges[item?.order_status]}`}>{item?.order_status}</span>
                                            </td>
                                            <td className="text-end ps-5">
                                                <Link to={reverse(routes?.orders?.show,{order_id : item._id})} className="text-white text-decoration-none">Details</Link>
                                            </td>
                                        </>
                                    )}
                                    />
                                </div>
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

export default OrderIndex