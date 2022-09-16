import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import useURL from '../Hooks/useURL';
import { getCategories } from '../Services/Categories';
import PropTypes from 'prop-types';
export default function ProductSidebar({onFilter}) {
    let {generateQueryLink,params} = useURL();
    const [refresh, setRefresh] = useState(0);
    const [categories, setCategories] = useState([]);
    const [filterValues, setFilterValues] = useState({
        rating : null,
        categories : [],
    });
    // get query string passed to react router 
    const ratingProps = {
        size: 30,
        value: 2.5,
        edit: true
    };

    const fetch = async (page = 1)=> {
        let {categories} = await getCategories({page,...params,pagination : 'required'});
        setCategories(categories);
    }
     
    useEffect(()=>{
        if(params){       
            fetch();            
        }
                
    },[params]);

    useEffect(()=>{
        if(params && params?.sub_category){
            setCategoriesFilter(params?.sub_category);
        }

    },[params?.sub_category]);
    
    const setCategoriesFilter = (value)=> {
        let categories = [...filterValues?.categories];
        let categoryIndex = categories?.findIndex((category)=> category == value);
        
        if(categoryIndex >= 0) {
            categories.splice(categoryIndex,1); 
            setFilterValues({...filterValues,categories});        
        }else{
            categories.push(value); 
            setFilterValues({...filterValues,categories});
        }
    };
    const selectAllCategories = async ()=> {
        let isAllSelected = filterValues?.categories?.length == categories?.length;
        let newRefresh = refresh + 1;
        if(!isAllSelected){
            
            let categoryIds = await categories.map((category)=> category._id);
            setFilterValues({...filterValues,categories : categoryIds});
            setRefresh(newRefresh);
            return;
        }
        setFilterValues({...filterValues,categories : []});        
        setRefresh(newRefresh);
    };
    const getCheckedValue = (categoryId)=> {
        let categoryIndex = filterValues?.categories?.findIndex((category)=> category == categoryId);
        return (categoryIndex >= 0);
    };
    return (
        <div className="col-xl-3 col-lg-4 col-md-8 mx-auto mb-5">
            <form>
                <div className="accordion" id="categoryAccord">
                    <div className="accordion-item border-0 bg-transparent">
                        <h2 className="accordion-header" id="headingOne">
                            <button onClick={()=> selectAllCategories()} className={`accordion-button text-white ${filterValues?.categories?.length == categories?.length?'bg-yellow' :'bg-dark'}`} type="button">
                                All Categories
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show mt-4">
                            <div className="accordion-body grey-bg px-2">
                                <ul key={refresh} className="px-2">
                                    {
                                        categories?.map((item,itemIndex)=>(
                                            <li key={itemIndex}>
                                                <div className="d-flex justify-content-between align-items-center w-100 text-white text-decoration-none">
                                                    {item?.name}
                                                    <div className="form-check">
                                                        <input onChange={(e)=> setCategoriesFilter(e.target.value)} defaultChecked={getCheckedValue(item?._id)} value={item?._id} className="form-check-input rounded-circle" type="checkbox" name="categoryCheck" id={`category-${itemIndex}`} />
                                                        <label className="form-check-label" htmlFor={`category-${itemIndex}`} />
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <h4 className="fs-30 px-3">Rating</h4>
                                <ReactStars {...ratingProps} onChange={(rating)=>setFilterValues({...filterValues,rating})} value={filterValues?.rating} />
                                {/* <div className="star-rating mb-1">
                                    <input className="-transparent" type="radio" name="stars" defaultValue={5} />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={4} />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={3} defaultChecked />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={2} />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={1} />
                                </div> */}
                                <div className="text-center">
                                    <button onClick={()=> onFilter(filterValues)} type="button" className="btn gold-btn-solid mt-4 eq-width-btn mx-auto">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


ProductSidebar.propTypes = {
    onFilter : PropTypes.func
};

ProductSidebar.defaultProps = {
    onFilter : ()=> {},
};