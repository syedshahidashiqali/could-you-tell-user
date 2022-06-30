import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useMatch,
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

export default function Router(){
    const match = useMatch(window.location.pathname);
    return (
        <>
        <Routes>

                <Route path={route.home} exact element={<Home />} />
                <Route path={route.about} exact element={<About />} />
                
                <Route path={route.login} exact element={
                        <AuthGuard><Login /> </AuthGuard>} />
                <Route path={route.pr1} exact element={
                        <AuthGuard><PR1 /> </AuthGuard>} />
                <Route path={route.pr2} exact element={
                        <AuthGuard><PR2 /> </AuthGuard>} />
                <Route path={route.pr3} exact element={
                        <AuthGuard><PR3 /> </AuthGuard>} />
                <Route path={route.account} exact element={
                        <ProtectedRoutes><Account /> </ProtectedRoutes>} />
                <Route path={route.hostEvents} element={<ProtectedRoutes><Index /> </ProtectedRoutes>}>
                  <Route path="" element={<ProtectedRoutes><Categories /> </ProtectedRoutes>} />
                  <Route path={route.hostEventsForm} element={<ProtectedRoutes><Booking /> </ProtectedRoutes>} />
                </Route>
                <Route path={route.signup} exact element={<AuthGuard><Signup /></AuthGuard>} />
        </Routes>
        </>
    )
}