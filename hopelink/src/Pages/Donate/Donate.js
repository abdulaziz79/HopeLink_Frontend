import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from "./Donate.module.css";
import img from "../../assets/images/donate3.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sell from './Sell/Sell';
import Request from './Request/Request';
import { UserContext } from '../../UseContext/UserContext';
import Avatar from '@mui/material/Avatar';


function Donate() {
  const [activeButton, setActiveButton] = useState('Posts');
  const [imageBig, setImageBig] = useState(null); 
  const [isOverlay, setIsOverlay] = useState(false);
  const [isOverlayReq, setIsOverlayReq] = useState(false);
  const [data, setData] = useState([]);
  const [requestSupplies, setRequestSupplies] = useState([]);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH}/supplies`);
        if (response) {
          setData(response.data.supplies);
          console.log(response.data.supplies)
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    const fetchRequest = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH}/requestSupplies/supplies/requests`);
        if (response) {
          setRequestSupplies(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
    fetchRequest();
  }, []);

  const handleImageClick = (image) => {
    setImageBig(image);
  };

  const calculateTimeAgo = (dateString) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days <= 5) return `${days} day${days > 1 ? 's' : ''} ago`;

    return postDate.toLocaleDateString();
  };

  return (
    <>
      <Helmet>
        <title>Donate or Sell Supplies | Give to Make a Difference</title>
        <meta name="description" content="Donate, sell, or request supplies to help those in need. View posts or make requests for donations and supplies." />
      </Helmet>

      <section className={styles.container}>
        <header className={styles.top}>
          <img src={img} className={styles.img} alt="Donate" />
          <div className={styles.heroBackgrd}></div>
          <h1 className={styles.h1}>Give, Donate, or Sell to Make a Difference</h1>

          <form className={styles.filter}>
            <div className={styles.holder}>
              <label className={styles.h3} htmlFor="location">Location</label>
              <input id="location" type="text" name="location" placeholder="Enter your location" className={styles.input} />
            </div>

            <div className={styles.holder}>
              <label className={styles.h3} htmlFor="minPrice">Min price</label>
              <input id="minPrice" type="number" name="minPrice" placeholder="Enter min price" className={styles.input} />
            </div>

            <div className={styles.holder}>
              <label className={styles.h3} htmlFor="category">Category</label>
              <select id="category" className={styles.select}>
                <option value="forSell">For Sell</option>
                <option value="forRent">For Rent</option>
              </select>
            </div>

            <button type="reset" className={styles.button}>Reset</button>
          </form>
        </header>

        <main className={styles.bottom2}>
          <nav className={styles.buttons}>
            <button 
              className={`${styles.btn} ${activeButton === 'Posts' ? styles.active : ''}`} 
              onClick={() => setActiveButton('Posts')}
            >
              Posts
            </button>
            <button 
              className={`${styles.btn} ${activeButton === 'Requests' ? styles.active : ''}`} 
              onClick={() => setActiveButton('Requests')}
            >
              Requests
            </button>
          </nav>

          {activeButton === 'Posts' && (
            <section>
              <div className={styles.add}>
                <p>Donate / Sell</p>
                <button className={styles.btnPost} onClick={() => user ? setIsOverlay(true) : navigate('/login') }>+</button>
              </div>

              {Array.isArray(data) && data.length > 0 && data.map((donation, index) => (
                <article className={styles.post} key={index}>
                  <div className={styles.profile} onClick={() => navigate(`/profile/${donation.userId._id}`)}>
                  <Avatar
                    alt={donation.userId.name}
                     sx={{ cursor: "pointer", backgroundColor: "lightGrey", color: "#163357", height: "4rem", width: "4rem" }}
                      >
                {donation.userId.name.charAt(0).toUpperCase()} 
                   </Avatar>  
                    <div className={styles.name}>
                      <h3 className={styles.h4}>{donation.userId.name}</h3>
                      <p className={styles.time}>{calculateTimeAgo(donation.createdAt)}</p>
                    </div>
                  </div>

                  <div className={styles.holder2}>
                    <p className={styles.loc}><LocationOnIcon />{donation.location}</p>
                    <p className={styles.number}><PhoneIcon />{donation.phone}</p>
                    {donation.price > 0 && (
                      <p className={styles.price}><AttachMoneyIcon />{donation.price}</p>
                    )}
                  </div>

                  <p className={styles.desc}>{donation.description}</p>

                  {donation.image && (
                    <img src={`${process.env.REACT_APP_PATH}/images/${donation.image}`} onClick={() => handleImageClick(donation.postImage)} className={styles.postImage} alt="Donation Post" />
                  )}

                  {imageBig && (
                    <div className={styles.imageModal} onClick={() => setImageBig(null)}>
                      <img src={imageBig} className={styles.enlargedImage} alt="Enlarged" />
                      <div className={styles.closeButton} onClick={() => setImageBig(null)}>X</div>
                    </div>
                  )}
                </article>
              ))}
            </section>
          )}

          {activeButton === 'Requests' && (
            <section>
              <div className={styles.add}>
                <p>Ask for something</p>
                <button className={styles.btnPost} onClick={() => user ? setIsOverlayReq(true) : navigate('/login')}>+</button>
              </div>

              {requestSupplies.map((request, index) => (
                <article className={styles.post} key={index}>
                  <div className={styles.profile} onClick={() => navigate(`/profile/${request.requestedBy._id}`)}>
                  <Avatar
                    alt={request.requestedBy.name}
                     sx={{ cursor: "pointer", backgroundColor: "lightGrey", color: "#163357", height: "4rem", width: "4rem" }}
                      >
                {request.requestedBy.name.charAt(0).toUpperCase()} 
                   </Avatar>                     
                   <div className={styles.name}>
                      <h3 className={styles.h4}>{request.requestedBy.name}</h3>
                      <p className={styles.time}>{calculateTimeAgo(request.createdAt)}</p>
                    </div>
                  </div>

                  <div className={styles.holder2}>
                    <p className={styles.loc}><LocationOnIcon />{request.location}</p>
                    <p className={styles.number}><PhoneIcon />{request.phone}</p>
                  </div>

                  <p className={styles.desc}>{request.description}</p>
                </article>
              ))}
            </section>
          )}

          {isOverlay && <section className={styles.overlay}><Sell setIsOverlay={setIsOverlay} /></section>}
          {isOverlayReq && <section className={styles.overlay}><Request setIsOverlayReq={setIsOverlayReq} /></section>}
        </main>
      </section>
    </>
  );
}

export default Donate;
