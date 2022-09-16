import { reverse } from 'named-urls';
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import useCart from '../../Hooks/useCart';
import routes from '../../routes/routes';
import { getOrder } from '../../Services/Order';
import { asset, format_date, getImage, joinText, notification } from '../../Util/helpers';

export default function OrderDetail() {
    const { order_id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState({});
    let {getVariation} = useCart();
    const fetch = async () => {
        try {
            let { order } = await getOrder(order_id);
            setOrder(order);
        } catch (error) {
            console.log(error);
            if (error) {
                notification('something went wrong', 'error');
                // navigate(-1, { replace: true });
            }

        }
    };
    useEffect(() => {
        fetch();
    }, []);
    return (
        <section className="virtual-events text-white">
            {/* container starts */}
            <div className="container py-5">
                {/* row starts */}
                <div className="row">
                    <div className="col-12 my-5">
                        <h1 className="heading-lvl-one d-flex align-items-center">
                            <Link to={routes.orders.index} className="back-link"><i className="fas fa-chevron-left text-white" /></Link>
                            Order Details
                        </h1>
                    </div>
                    <div className="col-12 mb-3">
                        <ul className="detail-tabs mb-4">
                            <li className={`d-tab ${order?.order_status == 'Pending'?'active':''}`}>
                                <div className="tab-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34.225" height="31.734" viewBox="0 0 34.225 31.734">
                                        <g id="pending" transform="translate(-0.001)">
                                            <path id="Path_53503" data-name="Path 53503" d="M27.888,13.931V3.026A2.529,2.529,0,0,0,25.362.5H2.527A2.529,2.529,0,0,0,0,3.026V25.861a2.529,2.529,0,0,0,2.526,2.526H17.232A9.408,9.408,0,1,0,27.888,13.931ZM11.464,2.556h4.961V8.232l-2.1-.839a1.03,1.03,0,0,0-.763,0l-2.1.839ZM2.527,26.331a.47.47,0,0,1-.47-.47V3.026a.47.47,0,0,1,.47-.47H9.408V9.75a1.028,1.028,0,0,0,1.41.955l3.127-1.249L17.072,10.7a1.028,1.028,0,0,0,1.41-.955V2.556h6.881a.47.47,0,0,1,.47.47V13.47a9.409,9.409,0,0,0-9.747,12.861Zm22.29,3.847a7.353,7.353,0,1,1,7.353-7.353A7.361,7.361,0,0,1,24.817,30.178Zm0,0" transform="translate(0 -0.5)" fill="#585858" />
                                            <path id="Path_53504" data-name="Path 53504" d="M359.672,266.9h-2.784v-2.784a1.028,1.028,0,1,0-2.056,0v3.812a1.028,1.028,0,0,0,1.028,1.028h3.812a1.028,1.028,0,1,0,0-2.056Zm0,0" transform="translate(-331.112 -245.537)" fill="#585858" />
                                        </g>
                                    </svg>
                                </div>
                                <p className="mt-3">Pending</p>
                            </li>
                            <li className={`d-tab ${order?.order_status == 'In Process'?'active':''}`}>
                                <div className="tab-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20.761" height="38.272" viewBox="0 0 20.761 38.272">
                                        <g id="in-process-icon" transform="translate(0.001)">
                                            <g id="Group_12434" data-name="Group 12434" transform="translate(-0.001)">
                                                <path id="Path_53510" data-name="Path 53510" d="M28.352,4.719C28.352,1.235,22.758,0,17.971,0S7.591,1.235,7.591,4.719c0,4,4.669,11.491,7.533,14.417C12.26,22.062,7.591,29.554,7.591,33.553c0,3.484,5.593,4.719,10.38,4.719s10.38-1.236,10.38-4.719c0-4-4.669-11.491-7.533-14.417C23.683,16.21,28.352,8.717,28.352,4.719ZM27.2,33.553c0,2.378-4.614,3.565-9.227,3.565s-9.227-1.189-9.227-3.565c0-4.206,5.933-13.008,8.131-14.417-2.2-1.408-8.131-10.21-8.131-14.417,0-2.377,4.614-3.565,9.227-3.565S27.2,2.343,27.2,4.719c0,4.208-5.934,13.009-8.131,14.417C21.264,20.544,27.2,29.346,27.2,33.553Z" transform="translate(-7.591)" fill="#585858" />
                                                <path id="Path_53511" data-name="Path 53511" d="M10.527,31.426c0,.215,2.4.836,6.994.836s6.994-.622,6.994-.836c0-3.174-6.994-5.36-6.994-11.044C17.521,26.066,10.527,28.133,10.527,31.426Z" transform="translate(-7.141 3.126)" fill="#585858" />
                                                <path id="Path_53512" data-name="Path 53512" d="M17.284,16.792l.135,1.23.135-1.23c1.37-.773,6.084-6.868,6.084-9.482,0-.345-2.138-1.344-6.221-1.344s-6.221,1-6.221,1.344C11.2,9.923,15.914,16.019,17.284,16.792Z" transform="translate(-7.038 0.915)" fill="#585858" />
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <p className="mt-3">In Process</p>
                            </li>
                            <li className={`d-tab ${order?.order_status == 'Delivered'?'active':''}`}>
                                <div className="tab-icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32.918" height="24.884" viewBox="0 0 32.918 24.884">
                                        <g id="delivered" transform="translate(0.001)">
                                            <g id="Group_12421" data-name="Group 12421" transform="translate(22.039 16.637)">
                                                <g id="Group_12420" data-name="Group 12420">
                                                    <path id="Path_53505" data-name="Path 53505" d="M45.04,321.244a4.124,4.124,0,1,1-4.124,4.124A4.128,4.128,0,0,1,45.04,321.244Zm0,6.115a1.991,1.991,0,1,0-1.991-1.991A1.993,1.993,0,0,0,45.04,327.359Z" transform="translate(-40.916 -321.244)" fill="#585858" />
                                                </g>
                                            </g>
                                            <g id="Group_12423" data-name="Group 12423" transform="translate(3.625 16.637)">
                                                <g id="Group_12422" data-name="Group 12422">
                                                    <path id="Path_53506" data-name="Path 53506" d="M331.45,321.244a4.124,4.124,0,1,1-4.124,4.124A4.128,4.128,0,0,1,331.45,321.244Zm0,6.115a1.991,1.991,0,1,0-1.991-1.991A1.993,1.993,0,0,0,331.45,327.359Z" transform="translate(-327.326 -321.244)" fill="#585858" />
                                                </g>
                                            </g>
                                            <g id="Group_12425" data-name="Group 12425" transform="translate(20.084 5.297)">
                                                <g id="Group_12424" data-name="Group 12424">
                                                    <path id="Path_53507" data-name="Path 53507" d="M8.781,144.864a1.067,1.067,0,0,1,.948.578l2.986,5.794a1.066,1.066,0,0,1,.118.488v8.6a1.066,1.066,0,0,1-1.066,1.066h-2.6v-2.133H10.7v-7.278L8.13,147H0v-2.133Z" transform="translate(0 -144.864)" fill="#585858" />
                                                </g>
                                            </g>
                                            <g id="Group_12427" data-name="Group 12427" transform="translate(10.841 19.694)">
                                                <g id="Group_12426" data-name="Group 12426">
                                                    <rect id="Rectangle_8204" data-name="Rectangle 8204" width="12.158" height="2.133" fill="#585858" />
                                                </g>
                                            </g>
                                            <g id="Group_12429" data-name="Group 12429" transform="translate(-0.001 0)">
                                                <g id="Group_12428" data-name="Group 12428">
                                                    <path id="Path_53508" data-name="Path 53508" d="M184.082,62.479H203.1a1.066,1.066,0,0,1,1.066,1.066V83.239h-2.133V64.612H185.149V82.173h2.56v2.133h-3.626a1.066,1.066,0,0,1-1.066-1.066V63.545A1.066,1.066,0,0,1,184.082,62.479Z" transform="translate(-183.016 -62.479)" fill="#585858" />
                                                </g>
                                            </g>
                                            <g id="Group_12431" data-name="Group 12431" transform="translate(20.084 11.127)">
                                                <g id="Group_12430" data-name="Group 12430">
                                                    <rect id="Rectangle_8205" data-name="Rectangle 8205" width="11.767" height="2.133" fill="#585858" />
                                                </g>
                                            </g>
                                            <g id="Group_12433" data-name="Group 12433" transform="translate(5.082 6.15)">
                                                <g id="Group_12432" data-name="Group 12432" transform="translate(0 0)">
                                                    <path id="Path_53509" data-name="Path 53509" d="M272.8,158.487a1.066,1.066,0,0,0-1.506-.089l-5.287,4.7-2.1-2.124a1.066,1.066,0,1,0-1.518,1.5l2.808,2.844a1.066,1.066,0,0,0,1.467.048l6.044-5.368A1.066,1.066,0,0,0,272.8,158.487Z" transform="translate(-262.086 -158.128)" fill="#585858" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </div>
                                <p className="mt-3">Delivered</p>
                            </li>
                            <span className="connecting-line" />
                        </ul>
                    </div>
                    <div className="col-12">
                        <div className="tab-content mx-0">
                            <div id="pending" data-tab-content className="active">
                                <div className="row justify-content-start align-items-center mb-5">
                                    {/* PENDING ORDER ENTRY TABLE */}
                                    <div className="col-lg-6 col-6 mb-3">
                                        <p className="order-id text-white">Order # {order?._id}</p>
                                        <p className="order-date text-white">{format_date(order?.createdAt, 'DD MMMM YYYY hh:mm A')}</p>
                                    </div>
                                    <div className="col-lg-6 col-6 mb-3 text-end">
                                        <p className="order-total text-white">Total: ${order?.total}</p>
                                    </div>
                                    {/* WHITE CARDS FOR SHIPPING ADDRESS AND TOTAL SUMMARY */}
                                    <div className="col-lg-6 col-md-8 mx-auto mb-4">
                                        <div className="white-card bg-white px-lg-5 px-sm-3 px-3 py-4">
                                            <h4 className="mb-3">Shipping Address:</h4>
                                            <ul>
                                                <li>{joinText(order?.shipping_address?.first_name,order?.shipping_address?.last_name)}</li>
                                                <li>{order?.shipping_address?.street_address}</li>
                                                <li>{order?.shipping_address?.zip_code}</li>
                                                <li>{order?.shipping_address?.state?.name}, {order?.shipping_address?.city?.name}</li>
                                                <li>{order?.shipping_address?.country?.name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-8 mx-auto mb-4">
                                        <div className="white-card bg-white px-lg-5 px-sm-3 px-3 py-4">
                                            <h4 className="mb-3">Billing Address:</h4>
                                            <ul>
                                                <li>{joinText(order?.billing_address?.first_name,order?.billing_address?.last_name)}</li>
                                                <li>{order?.billing_address?.street_address}</li>
                                                <li>{order?.billing_address?.zip_code}</li>
                                                <li>{order?.billing_address?.state?.name}, {order?.billing_address?.city?.name}</li>
                                                <li>{order?.billing_address?.country?.name}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 px-0 mb-5">
                                        <h1 className="heading-lvl-one d-flex text-white align-items-center">
                                            Products:
                                        </h1>
                                        <div className="table-responsive text-start">
                                            <table className="table table-borderless text-start" id="wishlist-table">
                                                <tbody>
                                                    {
                                                        order?.products?.map((item,itemIndex) => (
                                                            <tr key={itemIndex}>
                                                                {/* product image */}
                                                                <td>
                                                                    <div className="wishlist-item-img">
                                                                        <img width={80} height="80" crossOrigin='anonymous' src={asset(getImage(item?.product?.images,0))} alt="" className="img-fluid border-radius-0" />
                                                                    </div>
                                                                </td>
                                                                {/* product title */}
                                                                <td>
                                                                    <div className="order-item-detail">
                                                                        <p className="item-title mb-2">{item?.product?.name}</p>
                                                                            {item?.product?.attributes?.map((attribute,attributeIndex)=> (
                                                                                <p key={attributeIndex} className="item-color mb-2">{attribute?.label}: {attribute?.value?.name}</p>
                                                                            ))}
                                                                    </div>
                                                                </td>
                                                                {/* product Quantity */}
                                                                <td>
                                                                    <p className="item-qty">Qty: {item?.qty}</p>
                                                                </td>
                                                                <td>
                                                                    <p className="item-qty">Unit Price: ${getVariation(item?.product?.attributes,item?.price)}</p>
                                                                </td>
                                                                <td>
                                                                    <Link to={reverse(`${routes?.shop?.index}/${routes?.shop?.productDetail}`,{category : item?.product?.category,id : item?.productId})} className="text-white text-decoration-none">Details</Link>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-md-8 mx-auto mb-4"></div>
                                    <div className="col-lg-6 col-md-8 mx-auto mb-4">
                                        <div className="white-card bg-white px-lg-5 px-sm-3 px-3 py-4">
                                            <h4 className="mb-4">Total Summary</h4>
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-6 mb-5">
                                                    <p className="font-weight-400">Sub Total ({order?.products?.length} Product)</p>
                                                </div>
                                                <div className="col-6 mb-5 text-end">
                                                    <p className="font-bold">${order?.total}</p>
                                                </div>
                                            </div>
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-6 mb-5">
                                                    <p className="font-weight-400">Total</p>
                                                </div>
                                                <div className="col-6 mb-5 text-end">
                                                    <p className="font-bold">${order?.total}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
