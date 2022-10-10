import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useMatch,
  Outlet,
} from "react-router-dom";


import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Home from "../Pages/Home/Index";
import About from "../Pages/About/Index";
import AuthGuard from "./AuthGuard";
import ProtectedRoutes from "./ProtectedRoutes";
import PR1 from "../Pages/PasswordRecovery/PR1";
import PR2 from "../Pages/PasswordRecovery/PR2";
import PR3 from "../Pages/PasswordRecovery/PR3";
import Account from "../Pages/Account/Index";
import Categories from "../Pages/Events/Categories";
import route from "./routes";
import Booking from "../Pages/Events/Booking";
import Dashboard from "../Pages/Dashboard";
import Index from "../Pages/Events/Index";
import Pay from "../Pages/Events/Pay";
import Invites from "../Pages/Events/Invites";
import Invitees from "../Pages/Lists/Index";
import CreateInviteeList from "../Pages/Lists/Create";
import EditInviteeList from "../Pages/Lists/Edit";
import Cards from "../Pages/Cards/Index";
import CategoriesList from "../Pages/Categories/Index";
import EditAccount from "../Pages/Account/Edit";
import MyEvents from "../Pages/Account/Events";
import EventsDetail from "../Pages/Events/Detail";
import EditEvent from "../Pages/Events/Edit";
import Subscriptions from "../Pages/Subscription/Index";
import SubscriptionPayment from "../Pages/Subscription/Payment";
import MySubscriptions from "../Pages/Account/Subscription";
import CreateStories from "../Pages/Stories/Create";
import Stories from "../Pages/Stories/Index";
import StoryTypes from "../Pages/Stories/Types";
import StoriesListing from "../Pages/Stories/Stories";
import StoryDetail from "../Pages/Stories/Detail";
import MyStories from "../Pages/Stories/MyStories";
import ShopMainPage from "../Pages/Shop/Index";
import SubCategories from "../Pages/Categories/SubCategories";
import Products from "../Pages/Shop/Product";
import ProductDetail from "../Pages/Shop/ProductDetail";
import Cart from "../Pages/Cart/Cart";
import Checkout from '../Pages/Checkout/Checkout';
import OrderIndex from "../Pages/Order/Index";
import Wishlist from "../Pages/Account/Wishlist";
import OrderDetail from "../Pages/Order/Show";
import ReviewIndex from "../Pages/Reviews/Index";
import ChangePassword from "../Pages/Account/ChangePassword";
import Contact from "../Pages/Contact/Contact";
import EditRoom from "../Pages/Events/Room/Edit";
import AttendEvent from "../Pages/Events/Attend";
import EventInvite from "../Pages/Events/EventInvite";
import TermsAndCondition from "../Pages/TermsAndCondition/Index";
import Faqs from "../Pages/Faqs/Index";
import PrivacyAndPolicy from "../Pages/PrivacyAndPolicy/Index";

export default function Router(){
    const match = useMatch(window.location.pathname);
    return (
        <>
        <Routes>
                
                <Route path={route.home} exact element={<Home />} />
                <Route path={route.about} exact element={<About />} />
                <Route path={route.terms} exact element={<TermsAndCondition />} />
                <Route path={route.faqs} exact element={<Faqs />} />
                <Route path={route.privacy} exact element={<PrivacyAndPolicy />} />
                
                <Route path={route.signup} exact element={<AuthGuard><Signup /></AuthGuard>} />
                <Route path={route.login} exact element={
                        <AuthGuard><Login /> </AuthGuard>} />
                <Route path={route.pr1} exact element={
                        <AuthGuard><PR1 /> </AuthGuard>} />
                <Route path={route.pr2} exact element={
                        <AuthGuard><PR2 /> </AuthGuard>} />
                <Route path={route.pr3} exact element={
                        <AuthGuard><PR3 /> </AuthGuard>} />
                
                {/* Protected Routes */}
                <Route path={route.account} exact element={<ProtectedRoutes><Outlet /> </ProtectedRoutes>}>
                        <Route path="" exact element={<ProtectedRoutes><Account /> </ProtectedRoutes>} />
                        <Route path={route.editAccount} exact element={<ProtectedRoutes><EditAccount /> </ProtectedRoutes>} />
                        <Route path={route.wishlist} exact element={<ProtectedRoutes><Wishlist /> </ProtectedRoutes>} />
                        <Route path={route.passwordChange} exact element={<ProtectedRoutes><ChangePassword /> </ProtectedRoutes>} />
                        
                </Route>
                <Route path={route.myEvents} exact element={<ProtectedRoutes><Outlet/></ProtectedRoutes>}>
                        <Route path="" exact index element={<ProtectedRoutes><MyEvents /> </ProtectedRoutes>} />
                        <Route path=':type' exact element={<ProtectedRoutes><MyEvents /> </ProtectedRoutes>} />
                </Route>
                <Route path={route.invitedEvents} exact element={<ProtectedRoutes><Outlet/></ProtectedRoutes>}>
                        <Route exact index element={<ProtectedRoutes><MyEvents /> </ProtectedRoutes>} />
                        <Route path=':type' exact element={<ProtectedRoutes><MyEvents /> </ProtectedRoutes>} />
                </Route>                
                <Route path='events/:id' exact element={<ProtectedRoutes><Outlet /> </ProtectedRoutes>}>
                        <Route path='' index exact element={<ProtectedRoutes><EventsDetail /> </ProtectedRoutes>} />
                        <Route path='edit' exact element={<ProtectedRoutes><EditEvent /> </ProtectedRoutes>} />
                        <Route path='room/edit' exact element={<ProtectedRoutes><EditRoom /> </ProtectedRoutes>} />
                        <Route path='attend' exact element={<ProtectedRoutes><AttendEvent /> </ProtectedRoutes>} />
                        <Route path='invite' exact element={<ProtectedRoutes><EventInvite /> </ProtectedRoutes>} />
                </Route>
                <Route path={route.hostEvents} element={<ProtectedRoutes><Index /> </ProtectedRoutes>}>
                  <Route path="" element={<ProtectedRoutes><Categories /> </ProtectedRoutes>} />
                  <Route path={route.hostEventsForm} element={<ProtectedRoutes><Booking /> </ProtectedRoutes>} />
                </Route>
                <Route path={route.hostEventsPay} element={<ProtectedRoutes><Pay /> </ProtectedRoutes>} />
                <Route path={route.hostEventSendInvite} element={<ProtectedRoutes><Invites /> </ProtectedRoutes>} />                
                <Route path={route.inviteesList} element={<ProtectedRoutes><Invitees /> </ProtectedRoutes>}></Route>
                <Route path={route.createInviteeList} element={<ProtectedRoutes><CreateInviteeList /> </ProtectedRoutes>}></Route>
                <Route path={route.editInviteeList} element={<ProtectedRoutes><EditInviteeList /> </ProtectedRoutes>}></Route>
                <Route path={route.savedCards} element={<ProtectedRoutes><Cards /> </ProtectedRoutes>}></Route>
                <Route path={route.categoriesList} exact element={<ProtectedRoutes><Outlet /> </ProtectedRoutes>}>
                        <Route path="" exact element={<CategoriesList />}></Route>
                        <Route path={route.subCategories} exact element={<SubCategories />}></Route>

                </Route>
                <Route path={route.subscriptions} exact element={<ProtectedRoutes><Outlet /> </ProtectedRoutes>}>

                <Route path="" exact element={<ProtectedRoutes><Subscriptions /> </ProtectedRoutes>}></Route>
                <Route path=":plan" exact element={<ProtectedRoutes><SubscriptionPayment /> </ProtectedRoutes>}></Route>
                </Route>
                <Route path={route.mySubscriptions} exact element={<ProtectedRoutes><MySubscriptions /> </ProtectedRoutes>}></Route>
                <Route path={route.uploadStories} exact element={<ProtectedRoutes><CreateStories /> </ProtectedRoutes>}></Route>
                
                <Route path={route.stories.index} exact element={<ProtectedRoutes><Outlet /> </ProtectedRoutes>}>

                        <Route path="" exact element={<Stories />}></Route>
                        <Route path={route.stories.category} exact element={<ProtectedRoutes><StoryTypes /> </ProtectedRoutes>}></Route>
                        <Route path={route.stories.listing} exact element={<ProtectedRoutes><StoriesListing /> </ProtectedRoutes>}></Route>
                        <Route path={route.stories.detail} exact element={<ProtectedRoutes><StoryDetail /> </ProtectedRoutes>}></Route>
                </Route>
                
                <Route path={route.myStories} exact element={<ProtectedRoutes><MyStories /> </ProtectedRoutes>}></Route>
                <Route path={route.shop.index} exact element={<ProtectedRoutes><Outlet /> </ProtectedRoutes>}>
                        <Route path="" exact element={<ShopMainPage />}></Route>                                                
                        <Route path={route.shop.products} exact element={<Products />}></Route>                        
                        <Route path={route.shop.productDetail} exact element={<ProductDetail />}></Route>
                </Route>
                <Route path={route.cart} exact element={<ProtectedRoutes><Cart /> </ProtectedRoutes>}></Route>
                <Route path={route.checkout} exact element={<ProtectedRoutes><Checkout /> </ProtectedRoutes>}></Route>
                <Route path={route.orders.index} exact element={<ProtectedRoutes><Outlet /> </ProtectedRoutes>}>
                        <Route path="" exact element={<OrderIndex />}></Route>                                                
                        <Route path={route.orders.show} exact element={<OrderDetail />}></Route>                                                
                </Route>
                <Route path={route.reviews} exact element={<ProtectedRoutes><ReviewIndex /> </ProtectedRoutes>}></Route>
                <Route path={route.contact} exact element={<Contact />}></Route>
        </Routes>
        </>
    )
}