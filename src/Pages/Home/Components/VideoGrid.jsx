import React, { useState } from 'react'
import { Link } from 'react-router-dom'

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
        <Link to={link} className="gold-btn-solid">More Video</Link>
        </div>
    </div>
    {/* video grid */}
    <div className="row">
        {items.map((item,index)=>(
            <div key={index} className="col-xl-3 col-md-6 col-11 mx-auto">
            <div className="video-box">
                <img src={item.cover} alt="" />
                <a href="video-story-listing.php" className="video-detail-link text-white"><i className="fas fa-play" /></a>
                <div className="video-overlay" />
            </div>
            <a className="video-title d-block" href="video-story-listing.php">{item.title}</a> 
            </div>
        ))}
    </div>
    </div>
    </>
  )
}

export default VideoGrid