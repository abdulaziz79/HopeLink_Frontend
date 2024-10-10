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
        <li ><a href="/" className={styles.li}>Home</a></li>
          <li ><a href="/house" className={styles.li}>Find House</a></li>
          <li ><a href="/donate" className={styles.li}>Donate</a></li>
          <li ><a href="#" className={styles.li}>Volunteer</a></li>

        </ul>
         <a href='/login'> <button className={styles.btn}>Login</button></a>
      </nav>
    </div>
  )
}

export default Navbar
