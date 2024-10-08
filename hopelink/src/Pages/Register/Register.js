import React from 'react'
import styles from "./Register.module.css"
import img from "../../assets/images/login.jpg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
function Register() {
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
        <h2 className={styles.h2}>Create an account</h2>
        <p className={styles.p2}>Already have an account? <Link to="/login" className={styles.register}>login</Link></p>
        <form className={styles.form}>
            <div className={styles.nameEmail}>
                <input type='text' id='text' name="name" placeholder='First name' required className={styles.input2}/>
                <input type='text' id='text' name="last name" placeholder='Last name' required className={styles.input2}/>

            </div>
          <input  type="text" id="email" name="email" placeholder='Enter your email' required className={styles.input} />
          <input type="password" id="password" name="password" placeholder='Enter your password' required className={styles.input} />
          <button type="submit" className={styles.button}>Create account</button>
        </form>
      </div>
    </div>
  )
}

export default Register
