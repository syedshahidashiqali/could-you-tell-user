import { reverse } from 'named-urls'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import routes from '../../../routes/routes'
import { asset } from '../../../Util/helpers'

function VideoGrid({title, link,items}) {
  return (
    <>
    {/* PREGNANCY VIDEOS  */}
    <div className="container mb-5">
    <div className="row mb-3">
        <div className="col-md-6">
        <h3 className="video-niche-title">{title}</h3>
        </div>
        <div className="col-md-6 col-11 mx-auto text-end">
        <Link to={link} className="gold-btn-solid">View More</Link>
        </div>
    </div>
    {/* video grid */}
    <div className="row">
        {items?.map((item,index)=>(
            <div key={index} className="col-xl-3 col-md-6 col-11 mx-auto">
            <div className="video-box">
                <img crossOrigin='anonymous' src={asset(item.cover_image)} alt="" />
                {/* <Link to={reverse(`${routes.stories.index}/${routes.stories?.detail}`,{ category : item?.category})} className="video-detail-link text-white"><i className="fas fa-play" /></Link> */}
                <Link to={reverse(`${routes.stories.index}/${routes.stories?.detail}`,{ category : item?.category, type: item?.story_type.toLowerCase(), id: item?._id})} className="video-detail-link text-white"><i className="fas fa-play" /></Link>
                <div className="video-overlay" />
            </div>
            <a className="video-title d-block">{item.title}</a> 
            </div>
        ))}
    </div>
    </div>
    </>
  )
}

export default VideoGrid