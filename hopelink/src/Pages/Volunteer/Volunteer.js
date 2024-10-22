import React, { useEffect, useState } from 'react';
import styles from "./Volunteer.module.css";
import img from "../../assets/images/volunteer1.jpg";  
import donationImg from "../../assets/images/donate2.jpg";  
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PostVolunteer from './PostVolunteer/PostVolunteer';
import Request from './Request/Request';
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { UserContext } from '../../UseContext/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';


function Volunteer() {
  const [activeButton, setActiveButton] = useState('Posts');
  const [imageBig, setImageBig] = useState(null); 
  const [isOverlay, setIsOverlay] =useState(false)
  const [isOverlayReq, setIsOverlayReq] =useState(false)
  const [requestData, setRequestData] = useState([])
  const [volunteers, setVolunteers] = useState([])
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true); 
  const navigate = useNavigate()


  const handleImageClick = (image) => {
    setImageBig(image); 
  };
  const fetchData = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/requestSupplies/volunteer/requests`,{withCredentials:true});
      if(response){
        setRequestData(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
    finally {
      setLoading(false); 
    }
  }

  const fetchVolunteer = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/volunteer/get/all`,{withCredentials:true});
      if(response){
        setVolunteers(response.data.volunteer)
        console.log("ssssssssssssss",response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
    finally {
      setLoading2(false); 
    }
  }
  useEffect(()=>{
    fetchData()
    fetchVolunteer()
  },[])

  function calculateTimeAgo(dateString) {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) {
      return 'Just now';
    } else if (minutes < 60) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days <= 5) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return postDate.toLocaleDateString();
    }
  }

  return (
    <>
      <Helmet>
        <title>Volunteer | Lend a Hand</title>
        <meta name="description" content="Offer or request volunteer services to help those in need." />
      </Helmet>

      <main className={styles.container}>
        <section className={styles.top}>
          <img src={img} className={styles.img} alt="Volunteer banner" />
          <div className={styles.heroBackgrd}></div>
          <h1 className={styles.h1}>Lend a Hand, Make a Difference</h1>
        </section>
        <section className={styles.bottom2}>
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

          {loading ? (
            <p className={styles.loading}>loading...</p>
          ):(
            <>
              {activeButton === "Posts" && (
            <div className={styles.add}>
              Offer a Service
              <button className={styles.btnPost} onClick={() => user ? setIsOverlay(true) : navigate('/login')}>+</button>
            </div>
          )}
              <section aria-label="Posts">
            {volunteers && activeButton === 'Posts' && volunteers.map((request, index) => (
              <article className={styles.post} key={index}>
                <div className={styles.profile} onClick={() => navigate(`/profile/${request.userId._id}`)}>
                <Avatar
                alt={request.userId.name}
                sx={{ cursor: "pointer", backgroundColor: "lightGrey", color: "#163357", height: "4rem", width: "4rem" }}
              >
                {request.userId.name.charAt(0).toUpperCase()} 
                   </Avatar>                       <div className={styles.name}>
                    <h3 className={styles.h4}>{request.userId.name}</h3>
                    <p className={styles.time}>{calculateTimeAgo(request.createdAt)}</p>
                  </div>
                </div>

                <div className={styles.holder2}>
                  <p className={styles.loc}><LocationOnIcon />{request.location}</p>
                  <div className={styles.number}>
                    <PhoneIcon />
                    {request.phone}
                  </div>
                </div>

                <p className={styles.desc}>{request.description}</p>
              </article>
            ))}
          </section>
            </>
          )}
        

          {activeButton === "Requests" && (
            <div className={styles.add}>
              Request a Service
              <button className={styles.btnPost} onClick={() => user ? setIsOverlayReq(true) : navigate('/login')}>+</button>
            </div>
          )}
        
            {loading2 ? (
              <p className={styles.loading}>loading...</p>
            ):(
              <>
          <section aria-label="Requests">
            {activeButton === 'Requests' && requestData.map((donation, index) => (
              <article className={styles.post} key={index}>
                <div className={styles.profile} onClick={() => navigate(`/profile/${donation.requestedBy._id}`)}>
                <Avatar
                    alt={donation.requestedBy.name}
                     sx={{ cursor: "pointer", backgroundColor: "lightGrey", color: "#163357", height: "4rem", width: "4rem" }}
                      >
                    {donation.requestedBy.name.charAt(0).toUpperCase()} 
                   </Avatar>                    <div className={styles.name}>
                    <h3 className={styles.h4}>{donation.requestedBy.name}</h3>
                    <p className={styles.time}>{calculateTimeAgo(donation.createdAt)}</p>
                  </div>
                </div>

                <div className={styles.holder2}>
                  <p className={styles.loc}><LocationOnIcon />{donation.location}</p>
                  <div className={styles.number}>
                    <PhoneIcon />
                    {donation.phone}
                  </div>
                </div>

                <p className={styles.desc}>{donation.description}</p>

                {donation.image && (
                  <img src={`${process.env.REACT_APP_PATH}/images/${donation.image}`} onClick={() => handleImageClick(donation.postImage)} className={styles.postImage} alt="Request image" />
                )}

                {imageBig && (
                  <div className={styles.imageModal} onClick={() => setImageBig(null)}>
                    <img src={imageBig} className={styles.enlargedImage} alt="Enlarged image" />
                    <button className={styles.closeButton} onClick={() => setImageBig(null)}>X</button>
                  </div>
                )}
              </article>
            ))}
          </section>
              </>
            )}

        
        </section>

        {isOverlay && (
          <section className={styles.overlay}>
            <PostVolunteer setIsOverlay={setIsOverlay} />
          </section>
        )}

        {isOverlayReq && (
          <section className={styles.overlay}>
            <Request fetchData={fetchData} setIsOverlayReq={setIsOverlayReq} />
          </section>
        )}
      </main>
    </>
  );

}

export default Volunteer;
