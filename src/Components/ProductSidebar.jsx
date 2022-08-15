import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCategories, getProductSubCategories } from '../Services/Categories';

export default function ProductSidebar() {
    let {id} = useParams();
    let [categories,setCategories] = useState([]); 
    const fetch = async (page = 1)=> {
        let {categories} = await getCategories(id);
        setCategories(categories);
    };
  
  useEffect(()=> {    
    fetch();  
  },[]);

    return (
        <div className="col-xl-3 col-lg-4 col-md-8 mx-auto mb-5">
            <form action>
                <div className="accordion" id="categoryAccord">
                    <div className="accordion-item border-0 bg-transparent">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button bg-yellow text-white" type="button">
                                All Categories
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show mt-4">
                            <div className="accordion-body grey-bg px-2">
                                <ul className="px-2">
                                    <li>
                                        <div className="d-flex justify-content-between align-items-center w-100 text-white text-decoration-none">
                                            Category A
                                            <div className="form-check">
                                                <input className="form-check-input rounded-circle" type="checkbox" name="categoryCheck" id="category-0" />
                                                <label className="form-check-label" htmlFor="category-0" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between w-100 text-white text-decoration-none">
                                            Category B
                                            <div className="form-check">
                                                <input className="form-check-input rounded-circle" type="checkbox" name="categoryCheck" id="category-1" />
                                                <label className="form-check-label" htmlFor="category-1" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between w-100 text-white text-decoration-none">
                                            Category C
                                            <div className="form-check">
                                                <input className="form-check-input rounded-circle" type="checkbox" name="categoryCheck" id="category-2" />
                                                <label className="form-check-label" htmlFor="category-2" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between w-100 text-white text-decoration-none">
                                            Category D
                                            <div className="form-check">
                                                <input className="form-check-input rounded-circle" type="checkbox" name="categoryCheck" id="category-3" />
                                                <label className="form-check-label" htmlFor="category-3" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between w-100 text-white text-decoration-none">
                                            Category E
                                            <div className="form-check">
                                                <input className="form-check-input rounded-circle" type="checkbox" name="categoryCheck" id="category-4" />
                                                <label className="form-check-label" htmlFor="category-4" />
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="d-flex align-items-center justify-content-between w-100 text-white text-decoration-none">
                                            Category F
                                            <div className="form-check">
                                                <input className="form-check-input rounded-circle" type="checkbox" name="categoryCheck" id="category-5" />
                                                <label className="form-check-label" htmlFor="category-5" />
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                <h4 className="fs-30 px-3">Rating</h4>
                                <div className="star-rating mb-1">
                                    <input className="-transparent" type="radio" name="stars" defaultValue={5} />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={4} />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={3} defaultChecked />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={2} />
                                    <input className="-transparent" type="radio" name="stars" defaultValue={1} />
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn gold-btn-solid mt-4 eq-width-btn mx-auto">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
