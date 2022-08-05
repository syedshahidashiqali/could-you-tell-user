import { reverse } from 'named-urls'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import routes from '../../routes/routes'
import { getStoryCategory } from '../../Services/Categories';

export default function StoryTypes() {
    const {category} = useParams();
    const [storyCategory,setStoryCategory] = useState(null);
    const fetch = async ()=> {
        let {category : categoryDetail} = await getStoryCategory(category);
        setStoryCategory(categoryDetail);
    };
    useEffect(()=>{
        fetch();
    },[]);
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-center">
                    <div className="col-12 text-start">
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">
                            <Link to={reverse(routes.stories.index)} className="back-link"><i className="fas fa-chevron-left text-white" /></Link> {storyCategory?.name}
                        </h1>
                        <p className="text-white">Select story category to proceed</p>
                    </div>
                </div>
                {/* no subscriptions alert box */}
                <div className="container">
                    <div className="row justify-content-start justify-content-lg-between align-items-center text-center">
                        <div className="col-lg-4 col-md-6 mb-5">
                            <Link to={reverse(`${routes.stories.index}/${routes.stories.listing}`,{category,type : 'video'})} className="story-type-card">
                                <div id="videosType" className="media-box" />
                                <h3 className="event-title my-4">Videos</h3>
                            </Link>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5">
                            <Link to={reverse(`${routes.stories.index}/${routes.stories.listing}`,{category,type : 'audio'})} className="story-type-card">
                                <div id="audioType" className="media-box" />
                                <h3 className="event-title my-4">Audio</h3>
                            </Link>
                        </div>
                        <div className="col-lg-4 col-md-6 mb-5">
                            <Link to={reverse(`${routes.stories.index}/${routes.stories.listing}`,{category,type : 'textual'})} className="story-type-card">
                                <div id="textualType" className="media-box" />
                                <h3 className="event-title my-4">Textual </h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}
