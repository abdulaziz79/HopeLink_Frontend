import React from 'react'
import styles from "./Navbar.module.css"


function Navbar() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
            HopeLink
        </div>
        <ul className={styles.navRight}>
          <li ><a href="/house" className={styles.li}>Find House</a></li>
          <li ><a href="#" className={styles.li}>Donate</a></li>
          <li ><a href="#" className={styles.li}>Volunteer</a></li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
