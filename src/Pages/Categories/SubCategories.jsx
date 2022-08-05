import { reverse } from "named-urls";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import routes from "../../routes/routes";
import { getProductSubCategories } from "../../Services/Categories";

export default function SubCategories() {
  let {id} = useParams();
  const [category,setCategory] = useState([]); 
  const fetch = async (page = 1)=> {
      let data = await getProductSubCategories(id);
      setCategory(data.category);
  };
  
  useEffect(()=> {    
    fetch();  
  },[]);

  return (
    <>
      <div className="container py-5 text-white">
        <div className="row py-sm-5 py-3 align-items-center justify-content-between">
          <div className="col-sm-6 text-start mb-sm-3 mb-1">
            <h1 className="heading-lvl-one">{category?.name}</h1>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 text-end mb-sm-3 mb-2">
            <form id="cut-form">
              <div className="d-flex align-items-center">
                <label className="mb-2 nowrap grey-text" htmlFor="country">Sort by</label>
                <select className="form-select form-field py-sm-2 py-1 ms-2 grey-text" aria-label="country or region">
                  <option selected>Latest</option>
                  <option value={1}>Oldest</option>
                  <option value={2}>Popular</option>
                </select>
              </div>
            </form>
          </div>
          <div className="col-12 text-end">
            <p>Total sub-category: {category?.sub_categories?.length}</p>
          </div>
        </div>
        <div className="row mb-4 pb-5 justify-content-center">
          {
            category?.sub_categories?.map((subCategory,categoryIndex)=> (
              <div key={categoryIndex} className="col-xl-auto col-lg-3 col-md-4 col-6 mb-md-5 mb-2 mt-md-4">
                <div className="popular-category position-relative">
                  <img src={category.category_image} crossOrigin="anonymous" alt="" className="img-fluid" />
                  <div className="category-tile">
                    <img src="images/category-title-image-a.png" alt="" className="img-fluid" />
                    <Link to={reverse(`${routes.shop.index}/${routes.shop.products}`,{category : id})} className="popular-category-title">{subCategory?.name}</Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}
