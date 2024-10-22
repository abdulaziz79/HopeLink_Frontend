import React from "react";
import { Link } from "react-router-dom";
import './Footer.module.css';
import style from './Footer.module.css'
import { UserContext } from "../../UseContext/UserContext";
import { useContext } from "react";

const Footer = () => {
    const {user,} = useContext(UserContext)

    return(
    <footer className={style.footer}>
        <div className={style.heroBackgrd}></div>
        <div className={style.container}>
            <div className={style.logoDescription}>
                <Link to="/">
                    <span className={style.span} >CraftVista</span> 
                </Link>
                <p>Unlock the potential of your projects with curated expertise, seamless solutions, and a supportive community on our premier work platform.</p>            </div>
            <div className={style.contact}>
                <h3 className={style.title}>Support</h3>
                <ul className={style.links}>
                    <li>aboudecharkawi.com</li>
                    <li>79165588</li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
            <div className={style.company}>
                <h3 className={style.title}>Account</h3>
                <ul className={style.links}>
                    <li><Link to="/">my Account</Link></li>
                    <li><Link to="/signup">Login/Signup</Link></li>
                    <li><Link to={user && "/myprofile"}>Profile</Link></li>
                </ul>
            </div>
          
            <div className={style.contact}>
                <h3 className={style.title}>Quick Links</h3>
                <ul className={style.links}>
                    <li>Events</li>
                    <li><Link to="/about">About us</Link></li>
                    <li>Stories</li>
                </ul>
            </div>
            <div className={style.social}>
                <h3 className={style.title}>Social</h3>
                <ul className={style.socialLinks}>
 
                </ul>
                <form className={style.signUp}>
                    <label htmlFor="em">KEEP IN TOUCH</label>
                    <div className={style.inputBox}>
                        <input type="email" name="Email" id="em" placeholder="Your e-mail to subscribe" className={style.emailInput} />

                    </div>
                </form>
            </div>
        </div>
        <div className={style.copyright}>
            © 2024 - Craft-Vista All Rights Reserved | Powered By: Abdulaziz cherkawi
        </div>
    </footer>
)
}

export default Footer;