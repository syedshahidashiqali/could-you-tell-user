import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessagePopup from '../../Hooks/useMessagePopup';
import routes from '../../routes/routes';
import { getStoryCategories } from '../../Services/Categories';
import { uploadStory } from '../../Services/Story';
import { notification } from '../../Util/helpers';

export default function CreateStories() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState(null);
    const {successPopup} = useMessagePopup();
    const [formData, setFormData] = useState({
        story_type : '',
    });
    const fetch = async ()=> {
            let {categories : categoriesData} = await getStoryCategories();
            setCategories(categoriesData);
    };
    useEffect(()=> {
        fetch();
    },[]);
    const submit = async (e)=> {
        e.preventDefault();        
        try {
            let data = await uploadStory({...formData});
            successPopup({
                message : data.message,
            });
            navigate(routes.stories?.index);
        } catch (error) {
            notification(error.toString(),'error');
        }
        
    };
    return (
        <section className="virtual-events text-white">
            <div className="container py-5">
                {/* Invitee Lists */}
                <div className="row align-items-start">
                    <div className="col-lg-6 col-md-10 col-10 mx-auto text-start mb-5 ">
                        <div className="d-flex justify-content-between align-items-end">
                            <h1 className="heading-lvl-one d-flex align-items-center">Upload Story</h1>
                        </div>
                        <div className="profile-details mt-4 mb-lg-5 pb-2">
                            <div className="row align-items-start mb-5">
                                <form onSubmit={(e)=>submit(e)} id="cut-form">
                                    <div className="row mb-4">
                                        <div className="col-lg-6 mb-3">
                                            <label className="mb-2 ps-sm-4 ps-2" htmlFor="storyCategory">Story Category <span className="red">*</span></label>
                                            <select onChange={(e)=>setFormData({...formData,category : e.target.value})} className="form-select form-field" aria-label>
                                                <option value="">Select</option>
                                                {
                                                    categories?.map((item,itemIndex)=>(
                                                        <option key={itemIndex} value={item._id}>{item?.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label className="mb-2 ps-sm-4 ps-2" htmlFor="storyType">Story Type <span className="red">*</span></label>
                                            <select onChange={(e)=>setFormData({...formData,story_type : e.target.value})} className="form-select form-field" aria-label>
                                                <option value=''>Select</option>
                                                <option value="Audio">Audio</option>
                                                <option value="Video">Video</option>
                                                <option value="Textual">Textual</option>
                                            </select>
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label className="mb-2 ps-sm-4 ps-2" htmlFor="storyTitle">Title <span className="red">*</span></label>
                                            <input onChange={(e)=>setFormData({...formData,title : e.target.value})} type="text" name id="storyTitle" className="form-control form-field" placeholder="Enter Title" />
                                        </div>
                                        <div className="col-lg-6 mb-3">
                                            <label className="mb-2 ps-sm-4 ps-2" htmlFor="subTitle">Sub Title <span className="red">*</span></label>
                                            <input onChange={(e)=>setFormData({...formData,sub_title : e.target.value})} type="text" name id="subTitle" className="form-control form-field" placeholder="Enter Sub Title" />
                                        </div>
                                        <div className="col-12 mb-3">
                                            {/* Message */}
                                            <label className="mb-2 ps-sm-4 ps-2" htmlFor="email">Description  <span className="red">*</span></label>
                                            <textarea onChange={(e)=>setFormData({...formData,description : e.target.value})} className="form-control form-field" name id cols={30} rows={6} placeholder="Enter Message" defaultValue={""} />
                                        </div>
                                        <div className="col-xl-5 col-lg-6 col-md-5 col-sm-6 col-11 mb-3">
                                            <h2 className="heading-lvl-three">Cover Image</h2>
                                            <div id="upload-audio">
                                                <label htmlFor="music" className="d-block text-center audio-label">
                                                    <img src="images/upload-audio-icon.png" alt="" className="img-fluid" />
                                                    <p>Upload cover image</p>
                                                </label>
                                                <input onChange={(e)=> setFormData({...formData, cover_image : e.target.files[0] })} type="file" id="music" accept="image/*" />
                                            </div>
                                        </div>
                                        {
                                        (formData.story_type == 'Textual' || formData.story_type == '')?
                                        "":
                                        <div className="col-xl-5 col-lg-6 col-md-5 col-sm-6 col-11 mb-3">
                                            <h2 className="heading-lvl-three">{formData.story_type} File</h2>
                                            <div id="upload-audio">
                                                <label htmlFor="music1" className="d-block text-center audio-label">
                                                    <img src="images/upload-audio-icon.png" alt="" className="img-fluid" />
                                                    <p>Upload {formData.story_type} File</p>
                                                </label>
                                                <input accept={`${formData.story_type}/*`} onChange={(e)=> setFormData({...formData, media : e.target.files[0] })} type="file" id="music1" />
                                            </div>
                                        </div>                                            
                                        }
                                    </div>
                                    <button type="submit" className="gold-btn-solid d-inline-block mb-4 eq-width-btn me-3 px-4">Upload</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-8 mx-auto text-center mb-5">
                        <div id="loginAnim" />
                    </div>
                </div>
            </div>
        </section>

    )
}
