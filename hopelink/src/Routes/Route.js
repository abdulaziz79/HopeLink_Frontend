import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Layout from "./Layout";


const Router = ()=>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/login" element = {<Login />} />
                <Route element={<Layout />}>
                <Route path="/" element = {<Home />} />

                </Route>

            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Router