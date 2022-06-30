import React from 'react'
import { useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom';

export default function Account() {
    const store = useStore();
    const {user} =  useSelector(state=> state);
  return (
    <section className="virtual-events text-white">
  <div className="container py-5">
    <div className="row py-5 align-items-center">
      <div className="col-lg-6 col-md-7 col-sm-8 col-11 mx-auto text-start">
        <h1 className="heading-lvl-one mb-4">My Profile</h1>
        <div className="d-flex align-items-md-center align-items-start justify-content-start flex-column flex-md-row">
          <img crossOrigin='anonymous' src={user?.user_image?user?.user_image:'images/user-avatar.png'} alt="" className="img-fluid rounded-circle w-25" />
          <p className="user-name ms-md-4 silver-text mt-3 mt-md-0">{user?.name}</p>
        </div>
        <div className="profile-details mt-4">
          <h5 className="grey-text">Email Address</h5>
          <p className="silver-text">{user?.auth?.email}</p>
          <h5 className="mt-4 grey-text">Phone Number</h5>
          <p className="silver-text">{user?.phone}</p>
          <Link to='account/edit' className="gold-btn-solid d-inline-block my-4 eq-width-btn text-center">Edit Profile</Link>
          <Link to="/password/change" className="change-pass d-block" data-bs-toggle="modal" data-bs-target="#changePassword">Change Password</Link>
        </div>
      </div>
      <div className="col-lg-6 col-md-8 col-sm-10 mx-auto">
        <div id="profileAnim" />
      </div>
    </div>
  </div>
</section>

  )
}
