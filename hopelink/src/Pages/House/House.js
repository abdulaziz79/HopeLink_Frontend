import React from 'react'
import styles from "./House.module.css"
import img from "../../assets/images/house.jpg"

function House() {
  return (
    <div className={styles.container}>
        <div className={styles.top}>
      <img src={img} className={styles.img} />
      <div className={styles.heroBackgrd}></div>
      <h1 className={styles.h1}>Find safe shelter, Offer a Home.</h1>
      <div className={styles.filter}>
        
      </div>
      </div>

    </div>
  )
}

export default House
