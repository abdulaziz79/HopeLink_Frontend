import React from 'react'
import styles from "./About.module.css"
import img from "../../assets/images/about.jpg"

function About() {
  return (
    <div className={styles.container}>
      {/* <h1 className={styles.h1}>About us</h1> */}
      <div className={styles.left}>
        <div className={styles.card1}>
            <h2 className={styles.h2}>About Us</h2>
            <p className={styles.p}>At HopeLink, our mission is to bring people together in times of crisis by providing a simple, effective way to connect those in need with those who can help. Born out of a desire to support the people displaced by war in Southern Lebanon, our platform is designed to facilitate humanitarian aid through housing, donations, and volunteer services.</p>
        </div>
        <div className={styles.card}>
            <h2 className={styles.h2}>Our Mission</h2>
            <p className={styles.p}>We aim to be a beacon of hope for communities affected by displacement, providing a space where individuals can find shelter, essential supplies, and volunteer assistance. Whether you're looking to offer help or in need of support, our platform makes it easy to connect with others who share the same desire to make a positive difference.</p>
        </div>
      </div>
      <div className={styles.right}>
        <img className={styles.img} src={img}></img>
        <div className={styles.heroBackgrd}></div>
      </div>
    </div>
  )
}

export default About
