import React from 'react'

export default function About() {
    return (
        <section className="text-offwhite">
            <div className="container pb-5">
                <div className="row py-5 align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-12 mb-3 order-2 order-lg-1">
                        <h3 className="heading-lvl-two font-weight-light">About Us</h3>
                        <p className="my-4 font-weight-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has been the industry's standard dummy text ever since the when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book.</p>
                        <p className="mt-4 font-weight-light">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        <p className="mt-4 font-weight-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has been the industry's standard dummy text ever since the when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book.It has survived not
                            only five centuries, but also the leap into electronic.
                        </p>
                    </div>
                    <div className="col-lg-5 col-md-7 col-sm-8 col-8 mx-auto text-center mb-3 order-1 order-lg-2">
                        <img src="images/about-image.png" alt="" className="img-fluid" />
                    </div>
                </div>
                <div className="row my-5 justify-content-center align-items-center">
                    <div className="col-lg-5 col-md-6 col-sm-8 col-8 text-center mb-3">
                        <img src="images/create-your-stories-image.png" alt="" className="img-fluid" />
                    </div>
                    <div className="col-lg-5 mb-3">
                        <h3 className="heading-lvl-two font-weight-light">Create your stories with<br /> could you tell?</h3>
                        <p className="my-4 font-weight-light">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                            has been the industry's standard dummy text ever since the when an unknown printer
                            took a galley of type and scrambled it to make a type specimen book.</p>
                        <p className="mt-4 font-weight-light">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
                        <a href="stories-listing-categories.php" className="gold-btn-solid d-inline-block mt-4" data-bs-toggle="modal" data-bs-target="#loginToHostEvent">View More Stories</a>
                    </div>
                </div>
            </div>
        </section>
    )
}
