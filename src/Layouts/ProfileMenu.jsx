import { Link } from "react-router-dom"
import { logout } from "../Services/Auth"
import MenuItems from "./data/ProfileMenuItems"
// import
export default function ProfileMenu({user}) {
    return (
        <div className="navbar-nav align-items-xl-center mt-4 mt-xl-0">
            <div className="d-flex align-items-center ms-3">
                <a className="nav-link auth-link d-none d-xl-block px-1" href="#search"><img src="images/search-icon.svg" alt="" className="img-fluid" /></a>
                {/* cart */}
                <a className="nav-link auth-link d-none d-xl-block px-1" href="cart.php"><img src="images/cart-icon.svg" alt="" className="img-fluid" /></a>
                {/* Notifications */}
                <div className="position-relative d-none d-xl-block px-1">
                    <a className="nav-link dropdown-toggle no-icon auth-link px-1" href="#" id="notiDrop" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="fas fa-bell noti-bell text-white" />
                        <span className="noti-count">2</span>
                    </a>
                    <div className="dropdown-menu" id="noti-dropdown-menu" aria-labelledby="notiDrop">
                        <div className="notification-box">
                            <img src="images/blac-bell.png" alt="" className="img-fluid me-2" />
                            <div className="noti-summary">
                                <p>Lorem Ipsum is simply dummy text of printing....</p>
                                <ul className="list-inline">
                                    <li className="list-inline-item" id="noti-date">Dec 19, 2020</li>
                                    <li className="list-inline-item"><span className="line-separator">|</span></li>
                                    <li className="list-inline-item" id="noti-time">10:30 AM</li>
                                </ul>
                            </div>
                        </div>
                        <div className="notification-box">
                            <img src="images/blac-bell.png" alt="" className="img-fluid me-2" />
                            <div className="noti-summary">
                                <p>Lorem Ipsum is simply dummy text of printing....</p>
                                <ul className="list-inline">
                                    <li className="list-inline-item" id="noti-date">Dec 19, 2020</li>
                                    <li className="list-inline-item"><span className="line-separator">|</span></li>
                                    <li className="list-inline-item" id="noti-time">10:30 AM</li>
                                </ul>
                            </div>
                        </div>
                        <a href="notifications.php" className="d-block text-center gold-link my-4">View All Notification</a>
                    </div>
                </div>
            </div>
            <div className="position-relative d-none d-xl-block">
                <button type="button" className="nav-link bg-transparent border-0 dropdown-toggle no-icon ms-0" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="d-flex align-items-center">
                        <img src="images/account-picture.svg" alt="" className="img-fluid profile-icon" />
                        <p className="ms-2 pt-2"> {user.name} <i className="fas fa-angle-down silver" /></p>
                    </div>
                </button>
                <ul className="dropdown-menu user-special" id="cut-dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {
                        MenuItems.map((item,index)=>{
                            return (
                                <li key={index}><Link  className="dropdown-item" to={item.to}> <img src={item.icon} alt="" className="img-fluid me-2" /> {item.label}</Link></li>
                            )
                        })
                    }
                    <li><a className="dropdown-item" href="#" onClick={()=> logout()}> <img src="images/logout-icon.svg" alt="" className="img-fluid me-2" />Logout</a></li>
                </ul>
            </div>
            <ul className="list-inline d-flex align-items-center d-xl-none">
                <li className="list-inline-item">
                    <a className="nav-link auth-link" href="#"><img src="images/search-icon.svg" alt="" className="img-fluid" /></a>
                </li>
                <li className="list-inline-item">
                    <a className="nav-link auth-link" href="cart.php"><img src="images/cart-icon.svg" alt="" className="img-fluid" /></a>
                </li>
                <li className="list-inline-item">
                    <div className="position-relative">
                        <a className="nav-link dropdown-toggle no-icon auth-link" href="#" id="notiDrop" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fas fa-bell noti-bell text-white" />
                            <span className="noti-count">2</span>
                        </a>
                        <div className="dropdown-menu" id="noti-dropdown-menu" aria-labelledby="notiDrop">
                            <div className="notification-box">
                                <img src="images/blac-bell.png" alt="" className="img-fluid me-md-2 me-sm-3 me-auto" />
                                <div className="noti-summary">
                                    <p>Lorem Ipsum is simply dummy text of printing....</p>
                                    <ul className="list-inline">
                                        <li className="list-inline-item" id="noti-date">Dec 19, 2020</li>
                                        <li className="list-inline-item" id="noti-time">10:30 AM</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="notification-box">
                                <img src="images/blac-bell.png" alt="" className="img-fluid me-md-2 me-sm-3 me-auto" />
                                <div className="noti-summary">
                                    <p>Lorem Ipsum is simply dummy text of printing....</p>
                                    <ul className="list-inline">
                                        <li className="list-inline-item" id="noti-date">Dec 19, 2020</li>
                                        <li className="list-inline-item" id="noti-time">10:30 AM</li>
                                    </ul>
                                </div>
                            </div>
                            <a href="notifications.php" className="d-block text-center gold-link my-4">View All Notification</a>
                        </div>
                    </div>
                </li>
                <li className="list-inline-item">
                    {/* user account */}
                    <div className="position-relative">
                        <button type="button" className="nav-link bg-transparent border-0 dropdown-toggle no-icon" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            <div className="d-flex align-items-center">
                                <img src="images/account-picture.svg" alt="" className="img-fluid" />
                                <p className="ms-2 pt-2"> {user.name}</p>
                            </div>
                        </button>
                        <ul className="dropdown-menu" id="cut-dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="my-profile.php"> <img src="images/my-profile-icon.svg" alt="" className="img-fluid me-2" /> My Profile</a></li>
                            <li><a className="dropdown-item" href="my-events.php"> <img src="images/my-events-icon.svg" alt="" className="img-fluid me-2" /> My Events</a></li>
                            <li><a className="dropdown-item" href="my-subscriptions.php"> <img src="images/my-subs-icon.svg" alt="" className="img-fluid me-2" /> My Subscriptions</a></li>
                            <li><a className="dropdown-item" href="my-stories.php"> <img src="images/my-subs-icon.svg" alt="" className="img-fluid me-2" /> My Stories</a></li>
                            <li><a className="dropdown-item" href="invitee-list.php"> <img src="images/invitee-list-icon.svg" alt="" className="img-fluid me-2" />Invitee Lists</a></li>
                            <li><a className="dropdown-item" href="saved-cards.php"> <img src="images/saved-card-icon.svg" alt="" className="img-fluid me-2" />Saved Cards</a></li>
                            <li><a className="dropdown-item" href="invited-events.php"> <img src="images/invited-events-icon.svg" alt="" className="img-fluid me-2" />Invited Events</a></li>
                            <li><a className="dropdown-item" href="wishlist.php"> <img src="images/heart-icon.svg" alt="" className="img-fluid me-2" />My Whishlist</a></li>
                            <li><a className="dropdown-item" href="my-orders.php"> <img src="images/my-events-icon.svg" alt="" className="img-fluid me-2" />My Orders</a></li>
                            <li><a className="dropdown-item" href="my-reviews.php"> <img src="images/reviews-icon.svg" alt="" className="img-fluid me-2" />My Reviews</a></li>
                            <li><a className="dropdown-item" href="category.php"> <img src="images/invitee-list-icon.svg" alt="" className="img-fluid me-2" />Categories</a></li>
                            <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#logout"> <img src="images/logout-icon.svg" alt="" className="img-fluid me-2" />Logout</a></li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    )
}
