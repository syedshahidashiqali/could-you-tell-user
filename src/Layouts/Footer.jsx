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
                        <li><a className="footer-link" href="index.php">Home</a></li>
                        <li><a className="footer-link" href="about.php">About Us</a></li>
                        <li><a className="footer-link" href="contact.php">Contact Us</a></li>
                        <li><a className="footer-link" href="shop.php">Shop</a></li>
                        <li><a className="footer-link" href="stories-listing-categories.php">Stories</a></li>
                        <li><a className="footer-link" href="upload-story-textual.php">Upload Stories</a></li>
                    </ul>
                    </div>
                    {/* USEFUL LINKS */}
                    <div className="mb-xl-4 mb-5 col-xl-3 col-lg-4 col-md-6">
                    <h3 className="footer-heading mb-lg-4 mb-2">Useful Links</h3>
                    <ul className="ms-4">
                        <li><a className="footer-link" href="terms-and-condition.php">Terms &amp; Conditions</a></li>
                        <li><a className="footer-link" href="faqs.php">FAQs</a></li>
                        <li><a className="footer-link" href="privacy.php">Privacy Policy</a></li>
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