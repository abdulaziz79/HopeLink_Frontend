import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Layout from "./Layout";
import House from "../Pages/House/House";
import Donate from "../Pages/Donate/Donate";
import Register from "../Pages/Register/Register";
import Profile from "../Pages/Profile/Profile";
import Volunteer from "../Pages/Volunteer/Volunteer";
import ScrollToTop from "../Components/ScrollToTop";


const Router = ()=>{
    return(
        <div>
            <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/login" element = {<Login />} />
                <Route path="/register" element = {<Register />} />
                <Route element={<Layout />}>
                <Route path="/" element = {<Home />} />
                <Route path="/house" element ={<House />} />
                <Route path="/donate" element ={<Donate />} />
                <Route path="/profile/:id" element ={<Profile />} />
                <Route path="/profile" element ={<Profile />} />
                <Route path="/volunteer" element ={<Volunteer />} />
                </Route>

            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Router