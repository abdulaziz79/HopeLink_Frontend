import React from 'react'
import styles from "./Login.module.css"
import img from "../../assets/images/login.jpg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';


function Login() {
  return (
    <div className={styles.container}>  
      <div className={styles.left}>
        <img src={img} className={styles.img} />
        <div className={styles.heroBackgrd}></div>
        <a href='/'><button className={styles.btn}>Back to website <ArrowForwardIcon /></button></a>
        <h1 className={styles.h1}>HopeLink</h1>
        <p className={styles.p}>Creating Connection,<br />Changing Lives</p>
      </div>
      <div className={styles.right}>
        <h2 className={styles.h2}>Access Your Account</h2>
        <p className={styles.p2}>Don't have an account? <Link to="/register" className={styles.register}>register</Link></p>
        <form className={styles.form}>
          <input  type="text" id="username" name="username" placeholder='Enter your email' required className={styles.input} />
          <input type="password" id="password" name="password" placeholder='Enter your password' required className={styles.input} />
          <button type="submit" className={styles.button}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
