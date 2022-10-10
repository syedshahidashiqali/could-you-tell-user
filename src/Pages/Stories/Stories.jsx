import { reverse } from 'named-urls';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'
import routes from '../../routes/routes';
import { getStoryCategory } from '../../Services/Categories';
import { getStories } from '../../Services/Story';
import { image_url } from '../../Util/connection_strings';

export default function StoriesListing() {
    let { type, category } = useParams();
    const [stories, setStories] = useState({});
    const [storyCategory,setStoryCategory] = useState(null);
    const fetch = async (page = 1) => {
        let data = await getStories({ page, type, category });
        setStories(data);
        let {category : categoryDetail} = await getStoryCategory(category);
        setStoryCategory(categoryDetail);
    };
    useEffect(() => {
        fetch();
    }, []);

    console.log(stories)
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                <div className="row py-5 align-items-baseline justify-content-between">
                    <div className="col-md-10 col-sm-9 col-8 text-start">
                        <h1 className="heading-lvl-one mb-4 d-flex align-items-center">
                            <Link to={reverse(`${routes.stories.index}/${routes.stories.category}`,{category})} className="back-link"><i className="fas fa-chevron-left text-white" /></Link> {storyCategory?.name}
                        </h1>
                    </div>
                    <div className="col-md-2 col-sm-3 col-4 text-end">
                        <p>Type: {type}</p>
                    </div>
                </div>
                <div className="container">
                    {/* video grid */}
                    <div className="row text-center">
                        {
                            stories?.data?.map((story, storyIndex) => (
                                <div key={storyIndex} className="col-xl-3 col-md-6 col-11 mx-auto mb-5 mt-3">
                                    <div className="video-box">
                                        <img src={(story?.cover_image.startsWith("uploads") &&!story?.cover_image.includes("undefined") && `${image_url}${story.cover_image}`) || "images/story-1.png"} alt="" />
                                    </div>
                                    <h3 className="video-title d-block">{story?.title}</h3>
                                    <Link to={reverse(`${routes.stories.index}/${routes.stories.detail}`,{category,type,id : story._id})} className="gold-btn-solid d-inline-block my-2 eq-width-btn me-3 text-center">View</Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>

    )
}
