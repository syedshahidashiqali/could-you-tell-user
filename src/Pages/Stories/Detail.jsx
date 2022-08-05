import { reverse } from 'named-urls';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import routes from '../../routes/routes';
import { getStoryCategory } from '../../Services/Categories';
import { getStoryDetail } from '../../Services/Story';
import { image_url } from '../../Util/connection_strings';

export default function StoryDetail() {
    let {id,category,type} = useParams();
    const [story, setStory] = useState(null);
    const [storyCategory,setStoryCategory] = useState(null);
    const fetch = async ()=> {
        let data = await getStoryDetail(id);
        setStory(data.story);
        let {category : categoryDetail} = await getStoryCategory(category);
        setStoryCategory(categoryDetail);
    };
    useEffect(()=>{
        fetch();
    },[]);
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-4 align-items-center">
                    <div className="col-12 text-start">
                        <h1 className="heading-lvl-one mb-2 d-flex align-items-center">
                            <Link to={reverse(`${routes.stories.index}/${routes.stories.listing}`,{category,type})} className="back-link"><i className="fas fa-chevron-left text-white" /></Link> {storyCategory?.name}
                        </h1>
                        <p>{story?.title}</p>
                    </div>
                </div>
                {/* no subscriptions alert box */}
                <div className="container">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <div className="story-banner">
                                {
                                    (type == 'video'?
                                    <video crossOrigin="anonymous" width={400} height="200">
                                        <source src={`${image_url}${story?.media}`}></source>
                                    </video>:'')
                                }
                                {/* <img src={`${image_url}/${story.cover_image}`} alt="" className="img-fluid" /> */}
                                {/* <a data-fslightbox href="images/video.mp4" className="play-button btn">
                                    <img src="images/play-button.png" alt="" className="img-fluid" />
                                </a> */}
                            </div>
                        </div>
                        <div className="col-12 mt-2">
                            {story?.description}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
