
import {Link} from "react-router-dom";
import routes from "../../../routes/routes";
function Banner2() {
  return (
    <section className="virtual-events text-white">
        <div className="container py-5">
            <div className="row py-5 align-items-center">
            <div className="col-lg-6 col-md-7 col-sm-8 col-8 mx-auto text-center mb-3">
                <img src="images/virtual-events-image.png" alt="" className="img-fluid" />
            </div>
            <div className="col-lg-6 col-md-12 mb-3">
                <h3 className="heading-lvl-two">Now you can create virtual events</h3>
                <p className="my-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                has been the industry's standard dummy text ever since the when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.
                </p>
                <p className="mt-4">It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                <Link to={routes.hostEvents} className="gold-btn-solid d-inline-block mt-4" 
                // data-bs-toggle="modal" 
                // data-bs-target="#loginToHostEvent"
                >Create Event</Link>
            </div>
            </div>
        </div>
    </section>
    
  )
}

export default Banner2