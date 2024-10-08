import React from 'react'
import styles from "./Services.module.css"
import img from "../../assets/images/hero.jpg"
import home from "../../assets/images/home.jpg"
import donate from "../../assets/images/donate.jpg"
import volunteer from "../../assets/images/volunteer.jpg"
import request from "../../assets/images/request.jpg"
import {Link} from "react-router-dom"



function Services() {
  return (
    <div className={styles.container}>
      <div className={styles.all}> 
        <div className={styles.left}>
        <Link to="/house" className={styles.link} >
          <div className={styles.card}>
              <div className={styles.star}>*</div>
            <div className={styles.cardText}>
              
              <h1 className={styles.h1}>FIND OR LIST A HOME</h1>
              <p className={styles.p}>Provide shelter or search for safe housing options for displaced families and individuals.</p>
            </div>
            <div className={styles.cardImage}>
              <img src={home} className={styles.img} />
            </div>
          </div>
            </Link>
            <Link to="/donate" className={styles.link} >
          <div className={styles.card}>
              <div className={styles.star}>*</div>
            <div className={styles.cardText}>
              
              <h1 className={styles.h1}>DONATE - SELL</h1>
              <p className={styles.p}>Share essential supplies or financial support to help those in need rebuild their lives..</p>
            </div>
            <div className={styles.cardImage}>
              <img src={donate} className={styles.img} />
            </div>
          </div>
          </Link>


          <div className={styles.card}>
              <div className={styles.star}>*</div>
            <div className={styles.cardText}>
              
              <h1 className={styles.h1}>Volunteer</h1>
              <p className={styles.p}>Lend your time and skills to make a meaningful impact in communities needing help.</p>
            </div>
            <div className={styles.cardImage}>
              <img src={volunteer} className={styles.img} />
            </div>
          </div>
          <div className={styles.card}>
              <div className={styles.star}>*</div>
            <div className={styles.cardText}>
              
              <h1 className={styles.h1}>REQUEST ASSISTANCE</h1>
              <p className={styles.p}>Submit requests for donations, supplies for sale, Volunteer or housing assistance to get the help you need.</p>
            </div>
            <div className={styles.cardImage}>
              <img src={request} className={styles.img} />
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <h1 className={styles.h2}>
          <span className={styles.span}>The Heart of Our</span> Platform
          </h1>
          
          <p className={styles.text}>This section is where lives change. Through donations, housing, and volunteering, we connect people in need with those ready to help. These actions are the foundation of rebuilding communities, offering hope, and providing essential support to those displaced or struggling. Every action here makes a real difference.</p>
        </div>
        

      </div>
    </div>
  )
}

export default Services
