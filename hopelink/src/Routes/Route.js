import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";


const Router = ()=>{
    return(
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/login" element = {<Login />} />
            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default Router