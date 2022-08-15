import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import routes from "../routes/routes";
import MenuItems from "./data/MenuItems"
import ProfileMenu from "./ProfileMenu"
export default function Navbar() {

    const {isLoggedIn, user} = useSelector(state => state);
    
    return (
        <>
            <section id="user-navigation">
                <div className="container">
                    <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-xl bg-transparent">
                        <div className="container-fluid px-0">
                            <Link className="navbar-brand" to={routes.home}><img src="images/logo.svg" alt="" className="img-fluid" /></Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"><img src="images/menu-toggle-icon.png" alt="" className="img-fluid" /></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                            <div className="navbar-nav align-items-xl-center mt-4 mt-xl-0 mx-auto">
                                {
                                    MenuItems?.map((item,key)=>{
                                        if(!item.isAuth && isLoggedIn)
                                        return (
                                            <Fragment key={key}>
                                                <Link className="nav-link" to={item.to}>{item.label}</Link>
                                                {item.seperator != undefined? 
                                                <span className="text-white d-none d-xl-inline-block">{item.seperator}</span>
                                                :''}
                                                
                                            </Fragment>
                                        )
                                        if(!isLoggedIn)
                                        return (
                                            <Fragment key={key}>
                                                <Link className="nav-link" to={item.to}>{item.label}</Link>
                                                {item.seperator != undefined? 
                                                <span className="text-white d-none d-xl-inline-block">{item.seperator}</span>
                                                :''}
                                                
                                            </Fragment>
                                        )
                                    }
                                    )
                                    }
                            </div>
                            {(isLoggedIn)?<ProfileMenu user={user}/>:''}
                            </div>
                        </div>
                        </nav>
                        <div id="search">
                        <span className="close">X</span>
                        <form role="search" id="searchform" action="/search" method="get">
                            <input defaultValue name="q" type="search" placeholder="type to search" />
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )    
}