import { reverse } from 'named-urls';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Pagination from '../../Components/Pagination';
import routes from '../../routes/routes';
import { getCategories } from '../../Services/Categories';

export default function Categories() {
    const [categories, setCategories] = useState({});
    
    const fetch = async (page = 1)=>{
        let data = await getCategories({page});
        setCategories(data);
    } 
    useEffect(()=>{
        fetch();
    },[]);

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
                            <div className="popular-category position-relative">
                                <img crossOrigin='anonymous' src={category.category_image} alt="" className="img-fluid" />
                                <div className="category-tile">
                                    <img
                                        src="images/category-title-image-e.png"
                                        alt=""
                                        className="img-fluid"
                                    />
                                    <Link to={reverse(routes.categoryDetail,{id : category._id})} className="popular-category-title">
                                        {category.name}
                                    </Link>
                                </div>
                            </div>
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
