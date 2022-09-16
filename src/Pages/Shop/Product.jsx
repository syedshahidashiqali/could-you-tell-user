import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Pagination from '../../Components/Pagination'
import ProductSidebar from '../../Components/ProductSidebar'
import { getProducts, updateWishlist } from '../../Services/Products';
// var Rating = require('react-rating');
// const Rating = require('react-rating');
import ReactStars from "react-rating-stars-component";
import { image_url } from '../../Util/connection_strings';
import routes from '../../routes/routes';
import { reverse } from 'named-urls';
import { getImage } from '../../Util/helpers';
import useURL from '../../Hooks/useURL';
import NoRecord from '../../Components/NoRecord';

export default function Products() {
    let [filterValues, setFilterValues] = useState({
        categories : [],
        rating : null,
    });
    const [products, setProducts] = useState({});
    let {category} = useParams();
    let {params,generateQueryLink} = useURL();
    
    const ratingProps = {
        size: 30,
        value: 2.5,
        edit: false
    };

    const fetch =  async ()=> {
        let data = await getProducts({...params,...filterValues});
        setProducts(data);
    };
    
    const toggleWishlist = async (productId,productIndex)=> {
            try {
                
                let data = await updateWishlist(productId);
                let productData = products.data;
                productData[productIndex].isWishlist = !productData[productIndex].isWishlist;
                productData = [...productData];
                setProducts({...products,data : productData});
                
            } catch (error) {
                console.log(error);
            }
    };
    useEffect(()=>{
        if(params){

            fetch();
            // console.log(params);
        }
    },[params,filterValues]);
    
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-start justify-content-start">
                    <ProductSidebar onFilter={(values)=> {setFilterValues({...filterValues,...values})}}></ProductSidebar>
                    <div className="col-xl-9 col-lg-8 col-md-10 mx-auto mb-5">
                        <div className="row justify-content-start align-items-center">
                            <div className="col-lg-8 mb-3">
                                <h3 className="heading-lvl-one">Products</h3>
                            </div>
                            <div className="col-lg-4 mb-3">
                                <form id="cut-form">
                                    <div className="d-flex align-items-center">
                                        <label className="mb-2 nowrap grey-text" htmlFor="country">Sort by</label>
                                        <select defaultValue={-1} className="form-select form-field py-sm-2 py-1 ms-2 grey-text" aria-label="country or region">
                                            <option value={-1}>Latest</option>
                                            <option value={1}>Oldest</option>
                                            <option value={2}>Popular</option>
                                        </select>
                                    </div>
                                </form>
                            </div>
                            {/* PRODUCT GRID HERE */}
                            <div className="col-12 mt-2">
                                <div className="row justify-content-start">
                                    {
                                        products?.data?.map((product,productIndex)=> (
                                            <div key={productIndex} className="col-xl-4 col-sm-6 col-6 mb-4">
                                                <div className="product-card">
                                                    <button onClick={()=> toggleWishlist(product._id,productIndex)} type="button" className="wishlist-btn"><i className={`fa-heart ${product.isWishlist?'fas':' far'} toggle-wishlist`} /></button>
                                                    <img crossOrigin='anonymous' src={`${image_url}${getImage(product.images)}`} alt="" className="img-fluid" />
                                                    <Link to={generateQueryLink(reverse(`${routes.shop.index}/${routes.shop.productDetail}`,{id : product._id}))} className="product-name pt-2">{product?.name}</Link>
                                                    <div className="text-center list-inline my-1" id="rating">
                                                        <ReactStars {...ratingProps} value={product.avgRatings} />
                                                    </div>
                                                    
                                                    <p className="product-price-range">${product?.price}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {<NoRecord data={products?.data}>
                                        0 products found
                                        </NoRecord>}
                                </div>
                            </div>
                            {/* PAGINATION */}
                            <Pagination onPageChange={(page)=> fetch(page)} data={products}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
