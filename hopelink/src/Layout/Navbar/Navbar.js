import React from 'react';
import styles from "./Navbar.module.css";
import { Home as HomeIcon, House as HouseIcon, VolunteerActivism as DonateIcon, Group as VolunteerIcon } from '@mui/icons-material'; // Importing icons

function Navbar() {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          HopeLink
        </div>
        <ul className={styles.navRight}>
          <li>
            <a href="/" className={styles.li}>
              <HomeIcon className={styles.icon} fontSize="large" /> {/* Home Icon */}
              <span className={styles.text}>Home</span>
            </a>
          </li>
          <li>
            <a href="/house" className={styles.li}>
              <HouseIcon className={styles.icon} fontSize="large" /> {/* House Icon */}
              <span className={styles.text}>Find House</span>
            </a>
          </li>
          <li>
            <a href="/donate" className={styles.li}>
              <DonateIcon className={styles.icon} fontSize="large" /> {/* Donate Icon */}
              <span className={styles.text}>Donate</span>
            </a>
          </li>
          <li>
            <a href="/volunteer" className={styles.li}>
              <VolunteerIcon className={styles.icon} fontSize="large" /> {/* Volunteer Icon */}
              <span className={styles.text}>Volunteer</span>
            </a>
          </li>
        </ul>
        <a href='/login'>
          <button className={styles.btn}>Login</button>
        </a>
      </nav>
    </div>
  );
}

export default Navbar;
