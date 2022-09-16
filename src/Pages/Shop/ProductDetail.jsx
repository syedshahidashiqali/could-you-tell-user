import { useEffect } from "react";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router-dom";
import Incremeter from "../../Components/Incremeter";
import Pagination from "../../Components/Pagination";
import ProductAttributes from "../../Components/ProductAttributes";
import ProductSlider from "../../Components/ProductSlider";
import useCart from "../../Hooks/useCart";
import { getProduct, getReviews } from "../../Services/Products";
import { format_date, getRatingPercentage, notification } from "../../Util/helpers";

export default function ProductDetail() {
  let { id } = useParams();
  const [product, setProduct] = useState({});
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState({});
  const [quantity,setQuantity] = useState(1);
  const [attributes,setAttributes] = useState([]);
  const [refreshPrice,setRefreshPrice] = useState(0);
  const {updateCart,getVariation} = useCart();
  const [sliderRefresh,setSliderRefresh] = useState(0);
  const fetch = async () => {
    let data = await getProduct(id);
    setProduct(data.product);
    setRatings(data.ratings);
  };
  const fetchReviews = async (page = 1)=> {
    let data = await getReviews(id,{page});
    setReviews(data);
    setSliderRefresh(sliderRefresh + 1);
  };
  
  const updateCartItem = ()=> {
      if(attributes.length != product?.attributes?.length){
        notification('attributes should be selected','error');
        return;
      }
      if(quantity == 0){
        notification('quantity should be atleast 1','error'); 
        return;
      }
      updateCart(quantity,{...product,attributes});
      notification('cart updated');
  };
  useEffect(() => {
    fetch();
    fetchReviews();
  },[]);

  const setSelectedAttribute = async (data)=> {
    let newAttributes = [...attributes]; 
    let attributeIndex = await newAttributes.findIndex(item => data?.attributeId == item?.attributeId);
    console.log(attributeIndex);
    if(attributeIndex >= 0){
      if(data?.value == undefined)
      newAttributes.splice(attributeIndex,1);
      else
      newAttributes[attributeIndex].value = data?.value;
    }else{

      await newAttributes.push(data);
    }
      await setAttributes([...newAttributes]);
    
      setRefreshPrice(refreshPrice + 1);

  };

  return (
    <div className="container ">
      <div className="row py-lg-5 pt-md-5 pb-2 align-items-start justify-content-around">
        <div className="col-lg-6 col-md-10 mx-auto">
          <ProductSlider key={sliderRefresh} product={product} setProduct={setProduct}/>
        </div>
        <div className="col-lg-6 col-12">
          <div className="d-flex align-items-start justify-content-between mt-lg-5 pt-5">
            <h3 className="fs-36 text-white mb-3">{product?.name}</h3>
          </div>
          <h4 className="product-type text-white text-uppercase pb-3 fs-18">Product Type: abc</h4>
          <ul className="list-inline rating my-3">
            <li className="list-inline-item"><span className="text-white">{product.total_ratings} Ratings &amp; {product.total_ratings} Reviews</span></li>
          </ul>
          <div className="d-flex align-items-center mb-3">
            <p className="text-white">Quantity:</p>
            <Incremeter onDecrement={(value)=> setQuantity(value)} onIncrement={(value)=> setQuantity(value)}/>
          </div>
          <ProductAttributes onSelection={(selectedAttribute)=> setSelectedAttribute(selectedAttribute)} attributes={product?.attributes}></ProductAttributes>
          <p className="cost fs-20 mt-4">Price: <span className="fs-25" key={refreshPrice}>${getVariation(attributes,product?.price)}</span></p>
          <button onClick={(e)=> updateCartItem()} type="button" className="gold-btn-solid d-inline-block my-4 eq-width-btn">Add to Cart</button>
        </div>
      </div>
      <div className="row my-lg-5 text-white">
        <div className="col-12">
          <h3 className="fs-30 text-white mb-3">Features and Specs</h3>
          <p className="fs-15 font-weight-light mb-5">{product?.description}</p>
        </div>
        <div className="col-12 mt-lg-5">
          <h3 className="faq-title fs-30 font-weight-light">Rating &amp; Review of {product?.title}</h3>
          <div className="row mt-4">
            <div className="col-xl-3 col-lg-4">
              <div className="review-details">
                <h4>{product.avgRatings} Stars</h4>
                <ReactStars key={product.avgRatings} size={30} value={product.avgRatings} edit={false} />
                <p>{product.total_ratings} Ratings &amp; {product.total_ratings} Reviews</p>
              </div>
            </div>
            <div className="col-xl-6 col-lg-8">
              {/* 1star */}
              {
                ratings?.map((rate,rateIndex)=> (
                  <div key={rateIndex} className="rating-status">
                    <p className="font-mine-shaft">{rate.rating} Star</p>
                    <div className="progress">
                      <div className="progress-bar bg-warning" role="progressbar" style={{ width: `${getRatingPercentage(product.total_ratings,rate.count)}%` }} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
                    </div>
                    <p className="ends-on-percent">{getRatingPercentage(product.total_ratings,rate.count)}</p>
                  </div>
                ))
              }
            </div>
          </div>
          {/* review with comments and reviewer name,date,details */}
          <div className="review-comments mt-5">
            <div className="col-12 mb-2 mb-md-5">
              <h3 className="faq-title fs-30 font-weight-light">Product Reviews</h3>
            </div>
            {
                reviews?.data?.map((review,reviewIndex)=> (
                  <div key={reviewIndex} className="row align-items-start justify-content-between my-md-5">
                    <div className="col-lg-1 col-md-2">
                      <img src={review?.user?.user_image} crossOrigin="anonymous" alt="" className="img-fluid" />
                    </div>
                    <div className="col-lg-9 col-md-10">
                      <h5 className="goboldthin font-dark">{review?.user?.name} --- {format_date(review.createdAt)}</h5>
                      <p className="silver-text fs-15 font-weight-light">
                        {review?.review}
                      </p>
                    </div>
                        <div key={reviewIndex} className="col-lg-2 col-md-12 text-end">
                          <ReactStars size={30} edit={false} value={review.rating}  />
                        </div>
                  </div>
                ))
            }
          </div>
        </div>
      </div>
      {/* PAGINATION */}
      <Pagination data={reviews} onPageChange={(page)=> fetchReviews(page)} />
    </div>

  )
}
