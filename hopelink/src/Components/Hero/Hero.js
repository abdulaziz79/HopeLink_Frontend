import React from 'react'
import styles from "./Hero.module.css"
import image from "../../assets/images/hero.jpg"

function Hero() {
  return (
    <div className={styles.container}>
        <div className={styles.hero}>
            <img src={image} className={styles.image} />
            <div className={styles.heroBackgrd}></div>
            <p className={styles.p}><span className={styles.span}>IN TIMES OF NEED,</span><br /> we stand together.<br /> "Find help, offer hope."</p>
            <div className={styles.pRight}>
              <h2 className={styles.h2}>We Make a Difference</h2>
              <p className={styles.p2}> Connecting those who can help<br /> with those in need — through homes,<br /> donations, and volunteering.</p>
              <h3>Learn more</h3>
            </div>
            <div className={styles.colorful}>
              <p className={styles.color1}>Give with purpose</p>
              <p className={styles.color2}>Safe Shelter Awaits</p>
              <p className={styles.color3}>Lend a Helping Hand</p>
              <p className={styles.color4}>Hope in Action</p>

            </div>
        </div>
      
    </div>
  )
}

export default Hero
