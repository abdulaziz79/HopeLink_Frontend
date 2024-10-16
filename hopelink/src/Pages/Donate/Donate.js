import React, { useEffect, useState } from 'react';
import styles from "./Donate.module.css";
import img from "../../assets/images/donate3.jpg";  // Profile image
import donationImg from "../../assets/images/donate2.jpg";  // Reusing the test image for posts
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Sell from './Sell/Sell';
import Request from './Request/Request';
import { useContext } from 'react';
import { UserContext } from '../../UseContext/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Donate() {
  const [activeButton, setActiveButton] = useState('Posts');
  const [imageBig, setImageBig] = useState(null); 
  const [isOverlay, setIsOverlay] =useState(false)
  const [isOverlayReq, setIsOverlayReq] =useState(false)
  const [ data, setData] =useState([])
  const [ requestSupplies, setRequestSupplies] =useState([])

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleImageClick = (image) => {
    setImageBig(image); 
  };

  const fetchData = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/supplies`)
      if(response){
        setData(response.data.supplies)
        console.log(response.data.supplies)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchRequest = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/requestSupplies/supplies/requests`)
      if(response){
        setRequestSupplies(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=>{
    fetchData()
    fetchRequest()
  },[])
  const donations = [
    {
      donorName: "Abdelaziz",
      location: "Tripoli",
      phoneNumber: "79165588",
      price: 500,
      description: "A used laptop in good condition, perfect for students.",
      timeAgo: "2 days ago",
      postImage: donationImg,
    },
    {
      donorName: "Fatima",
      location: "Beirut",
      phoneNumber: "70123456",
      price: 300,
      description: "Clothes for newborn babies, clean and well-packed.",
      timeAgo: "1 day ago",
      postImage: null, 
    },
    {
      donorName: "Hassan",
      location: "Sidon",
      phoneNumber: "78945612",
      price: 0, 
      description: "Old books for high school students.",
      timeAgo: "3 hours ago",
      postImage: img,
    }
  ];

  
  const requests = [
    {
      donorName: "Ali",
      location: "Tyre",
      phoneNumber: "70124587",
      description: "Looking for blankets for the winter season.",
      timeAgo: "4 days ago",
   
    },
    {
      donorName: "Zeinab",
      location: "Baalbek",
      phoneNumber: "71563489",
      description: "Need baby formula and food items urgently.",
      timeAgo: "1 week ago",
   
    },
    {
      donorName: "Ali",
      location: "Tyre",
      phoneNumber: "70124587",
      description: "Looking for blankets for the winter season.",
      timeAgo: "4 days ago",
   
    },
    {
      donorName: "Zeinab",
      location: "Baalbek",
      phoneNumber: "71563489",
      description: "Need baby formula and food items urgently.",
      timeAgo: "1 week ago",
   
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={img} className={styles.img} alt="Donate" />
        <div className={styles.heroBackgrd}></div>
        <h1 className={styles.h1}>Give, Donate, or Sell to Make a Difference</h1>
        <div className={styles.filter}>
          {/* Filter inputs */}
          <div className={styles.holder}>
            <h3 className={styles.h3}>Location</h3>
            <input
              type="location"
              name="location"
              placeholder="Enter your location"
              className={styles.input}
            />
          </div>
          <div className={styles.holder}>
            <h3 className={styles.h3}>Min price</h3>
            <input
              type="minPrice"
              name="minPrice"
              placeholder="Enter min price"
              className={styles.input}
            />
          </div>
          <div className={styles.holder}>
            <h3 className={styles.h3}>Max price</h3>
            <select className={styles.select}>
              <option className={styles.option}>For Sell</option>
              <option className={styles.option}>For Rent</option>
            </select>
          </div>
          <button className={styles.button}>Reset</button>
        </div>
      </div>

      {/* Donation posts or requests */}
      <div className={styles.bottom2}>
        {/* Tab buttons for Posts and Requests */}
        <div className={styles.buttons}>
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
        </div>
        {activeButton ==="Posts" && <div className={styles.add}>
      Donate / Sell <button className={styles.btnPost} onClick={()=> user ? setIsOverlay(true) : navigate('/login') }>+</button>
      </div>}
      {activeButton ==="Requests" && <div className={styles.add}>
      Ask for something <button className={styles.btnPost} onClick={()=> user ? setIsOverlayReq(true) :navigate('/login') } >+</button>
      </div>}


      {activeButton === 'Posts' && Array.isArray(data) && data.length > 0 && data.map((donation, index) => (
          <div className={styles.post} key={index}>
            <div className={styles.profile} onClick={()=>navigate(`/profile/${donation.userId._id}`)}>
              <img src={img} className={styles.image} alt="Profile" />
              <div className={styles.name}>
                <h3 className={styles.h4}>{donation.userId.name}</h3>
                <p className={styles.time}>{donation.timeAgo}</p>
              </div>
            </div>

            <div className={styles.holder2}>
            <p className={styles.loc}><LocationOnIcon />{donation.location}</p>

              <div className={styles.number}>
                <PhoneIcon />
                {donation.phone}
              </div>
              {donation.price > 0 && (
                <div className={styles.price}>
                  <AttachMoneyIcon />
                  {donation.price}
                </div>
              )}
            </div>

            <p className={styles.desc}>{donation.description}</p>
                
            {donation.image && <img src={`${process.env.REACT_APP_PATH}/images/${donation.image}`} onClick={() => handleImageClick(donation.postImage)} className={styles.postImage} alt="Donation Post" />}
            
            {imageBig && (
          <div className={styles.imageModal} onClick={() => setImageBig(null)}>
            <img src={imageBig} className={styles.enlargedImage} alt="Enlarged" />
            <div className={styles.closeButton} onClick={() => setImageBig(null)}>X</div>
          </div>
        )}
          </div>
        ))}

        {/* Requests (without images) */}
        {activeButton === 'Requests' && requestSupplies.map((request, index) => (
          <div className={styles.post} key={index}>
            {/* Single request without image */}
            <div className={styles.profile} onClick={()=>navigate(`/profile/${request.requestedBy._id}`)}>
              <img src={img} className={styles.image} alt="Profile" />
              <div className={styles.name}>
                <h3 className={styles.h4}>{request.requestedBy.name}</h3>
                <p className={styles.time}>{request.timeAgo}</p>
              </div>
            </div>

            <div className={styles.holder2}>
            <p className={styles.loc}><LocationOnIcon />{request.location}</p>

              <div className={styles.number}>
                <PhoneIcon />
                {request.phone}
              </div>
              {/* {request.price > 0 && (
                <div className={styles.price}>
                  <AttachMoneyIcon />
                  {request.price}
                </div>
              )} */}
            </div>

            <p className={styles.desc}>{request.description}</p>
          </div>
        ))}
      </div>
     { isOverlay && <section className={styles.overlay}><Sell setIsOverlay={setIsOverlay} /></section>}
     { isOverlayReq && <section className={styles.overlay}><Request setIsOverlayReq={setIsOverlayReq} /></section>}

    </div>
  );
}

export default Donate;
