import {Link} from "react-router-dom";
import routes from "../routes/routes";

export default function Footer(){
    return (
        <>
        <div>
            <section className="footer text-white">
                <div className="container">
                <div className="row justify-content-between align-items-start py-5">
                    <div className="mb-xl-4 mb-5 col-xl-3 col-12">
                    <img src="images/logo.svg" alt="" className="img-fluid" />
                    <p className="my-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio incidunt aperiam ab.</p>
                    <ul className="list-inline">
                        <li className="list-inline-item">
                        <a href="#" className="text-white footer-social"><i className="fab fa-facebook-f" /></a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#" className="text-white footer-social"><i className="fab fa-instagram" /></a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#" className="text-white footer-social"><i className="fab fa-skype" /></a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#" className="text-white footer-social"><i className="fab fa-twitter" /></a>
                        </li>
                    </ul>
                    </div>
                    {/* QUICK LINKS */}
                    <div className="mb-xl-4 mb-5 col-xl-3 col-lg-4 col-md-6 ml-3">
                    <h3 className="footer-heading mb-lg-4 mb-2">Quick Links</h3>
                    <ul className="ms-4">
                        <li><Link to={routes.home} className="footer-link">Home</Link></li>
                        <li><Link to={routes.about} className="footer-link">About Us</Link></li>
                        <li><Link to={routes.contact} className="footer-link">Contact Us</Link></li>
                        <li><Link to={"/shop"} className="footer-link">Shop</Link></li>
                        <li><Link to={"/stories"} className="footer-link">Stories</Link></li>
                        <li><Link to={routes.uploadStories} className="footer-link">Upload Stories</Link></li>
                    </ul>
                    </div>
                    {/* USEFUL LINKS */}
                    <div className="mb-xl-4 mb-5 col-xl-3 col-lg-4 col-md-6">
                    <h3 className="footer-heading mb-lg-4 mb-2">Useful Links</h3>
                    <ul className="ms-4">
                        <li><Link to={``} className="footer-link">Terms &amp; Conditions</Link></li>
                        <li><Link to={``} className="footer-link">FAQs</Link></li>
                        <li><Link to={``} className="footer-link">Privacy Policy</Link></li>
                    </ul>
                    </div>
                    {/* DOWNLOAD APP  */}
                    <div className="mb-xl-4 mb-5 col-xl-3 col-lg-4 col-12">
                    <h3 className="footer-heading mb-lg-4 mb-2">Download Links</h3>
                    <p className="my-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum debitis totam assumenda.</p>
                    <a href="#"><img src="images/playstore.png" alt="" className="img-fluid mb-lg-2 mb-2 mb-sm-2 mb-md-0 me-2 me-lg-0" /></a>
                    <a href="#"><img src="images/appstore.png" alt="" className="img-fluid mb-lg-2 mb-2 mb-sm-2 mb-md-0 me-2 me-lg-0" /></a>
                    </div>
                </div>
                </div>
            </section>
            <section className="copyright">
                <div className="container">
                <div className="row py-3">
                    <div className="col-12">
                    <p className="text-white">Copyright 2022 Could you tell All rights reserved.</p>
                    </div>
                </div>
                </div>
                <button type="button" className="back-to-top border-0 scrollToTopBtn"><i className="fas fa-angle-up" /></button>
            </section>
        </div>

        </>
    );
};