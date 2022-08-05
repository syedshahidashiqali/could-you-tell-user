import { updateWishlist } from "../Services/Products";
import Flickity from 'react-flickity-component'
import { asset } from "../Util/helpers";

export default function ProductSlider({product,setProduct}) {
    
    const flickityOptions = {
        initialIndex: 0,
        pageDots : false,
    };
    const flickityNavOptions = {
        pageDots : false,
        asNavFor : '.carousel-main'
    }
    const toggleWishlist = async () => {
        try {
            
            await updateWishlist(product._id);
            setProduct({...product,isWishlist : !product.isWishlist});
                      
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="one-product">
            {/* Flickity HTML init */}
            <div className="position-relative">
            <Flickity
                id="thumbnails"
                className={'carousel carousel-main'} // default ''
                elementType={'div'} // default 'div'
                options={flickityOptions} // takes flickity options {}
                disableImagesLoaded={true} // default false
                reloadOnUpdate // default false
                >
                    {
                        product?.images?.map((image,imageIndex)=>(
                            <div key={imageIndex} className="carousel-cell">
                                <img crossOrigin="anonymous" src={asset(image)} className="img-fluid" />
                                <span className="stock-label instock font-white gobold f-16">In Stock</span>
                            </div>
                        ))
                    }
                </Flickity>
                <button type="button" onClick={() => toggleWishlist()} className="wishlist-btn"><i className={`fa-heart ${product.isWishlist ? 'fas' : 'far'}`} ></i></button>

                <div className="carousel carousel-main" data-flickity="{&quot;pageDots&quot;: false, &quot;prevNextButtons&quot;: false}" id="big-image">
                </div>
            </div>
            {/* <div className="carousel carousel-nav" data-flickity="{ &quot;asNavFor&quot;: &quot;.carousel-main&quot;, &quot;contain&quot;: true, &quot;pageDots&quot;: false }"> */}
            <Flickity
                id="thumbnails"
                className={'carousel carousel-nav'} // default ''
                elementType={'div'} // default 'div'
                options={flickityNavOptions} // takes flickity options {}
                disableImagesLoaded={true} // default false
                reloadOnUpdate // default false
                >
                    {
                        product?.images?.map((image,imageIndex)=>(
                            <div key={imageIndex} className="carousel-cell">
                                <img crossOrigin="anonymous" src={asset(image)} className="img-fluid" />
                            </div>
                        ))
                    }
                </Flickity>
            {/* </div> */}
            <div className="img-actions">
                <button onClick={() => toggleWishlist()} className="btn btn-solid-blue"><i className={`fa-heart ${product.isWishlist ? 'fas' : ' far'} toggle-wishlist`} /></button>
            </div>
        </div>
    )
}
