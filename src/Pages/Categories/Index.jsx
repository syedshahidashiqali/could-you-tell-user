import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination';
import useURL from '../../Hooks/useURL';
import routes from '../../routes/routes';
import { getCategories } from '../../Services/Categories';

export default function Categories() {
    let {generateQueryLink,params} = useURL();
    const [categories, setCategories] = useState({});
    // get query string passed to react router 
    
    const fetch = async (page = 1)=> {
        let data = await getCategories({page,...params});
        setCategories(data);
    }
     
    useEffect(()=>{
                
        fetch();
    },[params]);

    return (
        <div className="container py-5 text-white">
            <div className="row py-5 align-items-center justify-content-center">
                <div className="col-12 text-start mb-5">
                    <h1 className="heading-lvl-one">Categories</h1>
                </div>
            </div>
            <div className="row mb-4 pb-5 justify-content-center">
                {
                    categories?.data?.map((category,index)=>(
                        <div key={index} className="col-xl-auto col-lg-3 col-md-4 col-6 mb-md-5 mb-2 mt-md-4">
                            <Link to={
                                (params?.parent)?
                                generateQueryLink(reverse(`${routes.shop.index}/${routes.shop.products}`),{
                                    ...params,
                                    sub_category : category?._id
                                })
                                
                                :
                                generateQueryLink(reverse(`${routes.categoriesList}`),{parent : category?._id})
                                } className="popular-category-title">
                                    <div className="popular-category position-relative">
                                        <img crossOrigin='anonymous' src={category.category_image} alt="" className="img-fluid" />
                                        <div className="category-tile">
                                            <img
                                                src="images/category-title-image-e.png"
                                                alt=""
                                                className="img-fluid"
                                            />
                                                {category.name}
                                        </div>
                                    </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
            {/* PAGINATION */}
            <div className="row justify-content-center align-items-center g-0 px-md-5 px-3 mt-5">
                <div className="col-md-6 mb-4">
                    <Pagination data={categories} onPageChange={(page)=> fetch(page)}/>
                </div>
            </div>
        </div>

    )
}
