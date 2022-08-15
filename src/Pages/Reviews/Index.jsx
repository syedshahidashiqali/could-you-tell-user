import { reverse } from 'named-urls';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../Components/Table'
import routes from '../../routes/routes';
import { getUserReviews } from '../../Services/Products';
import { reviews as tableFields } from '../../Util/table-fields'

function ReviewIndex() {
    const [filterValues,setFilterValues] = useState({});
    const [reviews,setReviews] = useState({});
    const fetch = async (page = 1) => {
        const data = await getUserReviews({ page,...filterValues });
        setReviews(data);
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
                        <h1 className="heading-lvl-one">My Reviews</h1>
                    </div>
                    <div className="col-xxl-11">
                        <div className="cut-tabs">
                            {/* DELIVERED ORDERS */}
                            
                            <Table fields={tableFields} data={reviews}
                            extraHeads={()=> (
                                <th>Action</th>
                            )}
                            extraCells={(item)=> (
                                <td>
                                    <Link to={reverse(`${routes?.shop?.index}/${routes?.shop?.productDetail}`,{category : item?.product?.category,id : item?.product._id})} className="text-white text-decoration-none">Details</Link>
                                </td>
                            )}
                            />
                        </div>
                    </div>
                </div>
                {/* row ends */}
            </div>
            {/* containter ends */}
        </section>

    )
}

export default ReviewIndex