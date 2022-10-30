import React, { useState } from 'react'
import { useEffect } from 'react';
import { getCategories } from '../../Services/Categories';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls';
import routes from '../../routes/routes';
import useURL from '../../Hooks/useURL';
import { getProducts, updateWishlist } from '../../Services/Products';
import { image_url } from '../../Util/connection_strings';
export default function ShopMainPage() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    let {generateQueryLink} = useURL();
    const fetchPopularCategories = async () => {
        let data = await getCategories();
        setCategories(data);
    };

    const fetchProducts = async () => {
        let data = await getProducts({limit:4});
        setProducts(data);
    };

    
    useEffect(() => {
        fetchPopularCategories();
        fetchProducts();
    }, []);

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
    return (
        <div>
            <section className="shop-banner">
                {/*?php include('userNavigation.php'); ?*/}
                <div className="container py-5 text-white">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-12 text-start mb-5">
                            <h1 className="heading-lvl-one">Shop With Us</h1>
                        </div>
                        <div className="col-lg-11 col-sm-10 col-9 text-sm-end text-md-start text-lg-center pb-1">
                            <h2 className="fs-30 font-weight-light pb-4">Explore Popular Categories</h2>
                        </div>
                        <div className="col-lg-1 col-sm-2 col-3 text-end pb-1">
                            <Link to={routes.categoriesList} className="text-white">View All</Link>
                        </div>
                    </div>
                    <div className="row pb-5">
                        <OwlCarousel className='owl-theme' lazyContent>
                        {
                            categories?.data?.map((category,categoryIndex)=> (
                                <Link key={categoryIndex} to={generateQueryLink(reverse(`${routes.categoriesList}`),{parent : category?._id})}  className="popular-category-title">
                                    <div className="item">
                                        <div className="popular-category">
                                            <img src="images/popular-category-a.png" alt="" className="img-fluid" />
                                            <div className="category-tile">
                                                <img src="images/category-title-image-a.png" alt="" className="img-fluid" />
                                                    {category?.name}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                        </OwlCarousel>
                    </div>
                </div>
            </section>
            {/* MOST PURCHASED PRODUCTS */}
            <div className="container text-white">
                <div className="row align-items-center justify-content-center mb-4">
                    <div className="col-lg-11 col-sm-10 col-9 mt-5 text-sm-end text-md-start text-lg-center pb-5">
                        <h2 className="fs-30 font-weight-light">Most Purchased Products</h2>
                    </div>
                    <div className="col-lg-1 col-sm-2 col-3 text-end">
                        <Link to={routes.shop.products} className="text-white">View All</Link>
                    </div>
                </div>
                <div className="row align-items-start pb-5">
                    {
                        products?.data?.map((product,index) => (
                            <div className="col-xl-3 col-lg-4 col-sm-6 col-11 mx-auto mb-4" key={index}>
                                <div className="product-card">
                                    <button type="button" onClick={() => toggleWishlist(product?._id, index)} className="wishlist-btn">
                                        {product?.isWishlist ? (
                                            <i className="fas fa-heart toggle-wishlist" />
                                        ): (
                                            <i className="fa-heart  far toggle-wishlist" />
                                        )}
                                    </button>
                                    <img crossOrigin="anonymous" src={`${image_url}${product?.images[0]}`} alt="" className="img-fluid" />
                                    <Link to={reverse(`${routes.shop.index}/${routes.shop.productDetail}`,{id : product._id})} className="product-name pt-2">{product?.name}</Link>
                                    <ul className="list-inline my-1" id="rating">
                                        <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                        <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                        <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                        <li className="list-inline-item me-0"><i className="fas fa-star-half-alt" /></li>
                                        <li className="list-inline-item me-0"><i className="far fa-star" /></li>
                                    </ul>
                                    <p className="product-price-range">${product?.price}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
