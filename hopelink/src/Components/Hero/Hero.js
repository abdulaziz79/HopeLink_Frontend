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
        </div>
      
    </div>
  )
}

export default Hero
