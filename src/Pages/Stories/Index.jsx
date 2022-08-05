import { reverse } from "named-urls";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes/routes";
import { getStoryCategories } from "../../Services/Categories";

export default function Stories() {
  const [categories, setCategories] = useState([]);
  const fetch = async ()=> {
      let {categories : categoriesData} = await getStoryCategories();
      setCategories(categoriesData);
  };
  useEffect(()=> {
    fetch();
  },[]);
  return (
    <section className="virtual-events text-white">
      <div className="container py-5">
        <div className="row py-5 align-items-center">
          <div className="col-12 text-start">
            <h1 className="heading-lvl-one mb-4 d-flex align-items-center">Stories</h1>
            <p className="text-white">Select story category to proceed</p>
          </div>
        </div>
        {/* no subscriptions alert box */}
        <div className="container">
          <div className="row justify-content-center justify-content-lg-between align-items-center text-center">
            {
              categories?.map((category,categoryIndex)=> (
                <div key={categoryIndex} className="col-lg-4 col-sm-6 mb-5">
                  <Link to={reverse(routes.stories.category,{category : category._id})} className="host-event-card">
                    <img src="images/story-category-1.png" alt="" className="img-fluid" />
                    <h3 className="event-title my-xl-4 mb-md-4 my-3">{category?.name}</h3>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}