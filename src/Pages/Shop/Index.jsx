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

export default function ShopMainPage() {
    const [categories, setCategories] = useState([]);
    let {generateQueryLink} = useURL();
    const fetchPopularCategories = async () => {
        let data = await getCategories();
        setCategories(data);
    };
    useEffect(() => {
        fetchPopularCategories();
    }, []);

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
                        <a href="products.php" className="text-white">View All</a>
                    </div>
                </div>
                <div className="row align-items-start pb-5">
                    <div className="col-xl-3 col-lg-4 col-sm-6 col-11 mx-auto mb-4">
                        <div className="product-card">
                            <button type="button" className="wishlist-btn"><i className="fas fa-heart toggle-wishlist" /></button>
                            <img src="images/product-1.jpg" alt="" className="img-fluid" />
                            <a href="product-detail-instock.php" className="product-name pt-2">Crop Hoodie</a>
                            <ul className="list-inline my-1" id="rating">
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star-half-alt" /></li>
                                <li className="list-inline-item me-0"><i className="far fa-star" /></li>
                            </ul>
                            <p className="product-price-range">$42.00 – $44.00</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 col-11 mx-auto mb-4">
                        <div className="product-card">
                            <button type="button" className="wishlist-btn"><i className="fas fa-heart toggle-wishlist" /></button>
                            <img src="images/product-2.jpg" alt="" className="img-fluid" />
                            <a href="product-detail-instock.php" className="product-name pt-2">Unisex Long Sleeve Tee</a>
                            <ul className="list-inline my-1" id="rating">
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star-half-alt" /></li>
                                <li className="list-inline-item me-0"><i className="far fa-star" /></li>
                            </ul>
                            <p className="product-price-range">$42.00 – $44.00</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 col-11 mx-auto mb-4">
                        <div className="product-card">
                            <button type="button" className="wishlist-btn"><i className="fas fa-heart toggle-wishlist" /></button>
                            <img src="images/product-3.jpg" alt="" className="img-fluid" />
                            <a href="product-detail-instock.php" className="product-name pt-2">Champion Tie-Dye Hoodie</a>
                            <ul className="list-inline my-1" id="rating">
                                <li className="list-inline-item me-0 me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star-half-alt" /></li>
                                <li className="list-inline-item me-0"><i className="far fa-star" /></li>
                            </ul>
                            <p className="product-price-range">$42.00 – $44.00</p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-sm-6 col-11 mx-auto mb-4">
                        <div className="product-card">
                            <button type="button" className="wishlist-btn"><i className="fas fa-heart toggle-wishlist" /></button>
                            <img src="images/product-4.jpg" alt="" className="img-fluid" />
                            <a href="product-detail-instock.php" className="product-name pt-2">Pastel Baseball Hat</a>
                            <ul className="list-inline my-1" id="rating">
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star" /></li>
                                <li className="list-inline-item me-0"><i className="fas fa-star-half-alt" /></li>
                                <li className="list-inline-item me-0"><i className="far fa-star" /></li>
                            </ul>
                            <p className="product-price-range">$42.00 – $44.00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
