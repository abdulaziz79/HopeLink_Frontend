import React from 'react';
import styles from "./Navbar.module.css";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UseContext/UserContext';
import axios from 'axios';
import { Home as HomeIcon, House as HouseIcon, VolunteerActivism as DonateIcon, Group as VolunteerIcon } from '@mui/icons-material'; // Importing icons

function Navbar() {
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const logout = await axios.post(`${process.env.REACT_APP_PATH}/user/logout`, {}, { withCredentials: true })
      setUser(null)
      navigate('/login')
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

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
        <div style={{display:"flex"}}>
        {user ?  
          <button className={styles.btn} onClick={handleLogout}>Logout</button>
         : <a href='/login'>
          <button className={styles.btn}>Login</button>
        </a>}
        <p style={{color:"white"}}> profile</p>
        </div>
        
      </nav>
    </div>
  );
}

export default Navbar;
