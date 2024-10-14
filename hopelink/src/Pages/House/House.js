// import { useState } from "react";
import styles from "./House.module.css";
import img from "../../assets/images/house.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useEffect, useState } from "react";
import AddHouse from "./AddHouse/AddHouse";
import Request from "./Request/Request";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UseContext/UserContext";
import axios from "axios";

function House() {
  const [activeButton, setActiveButton] = useState('Posts');
  const [isOverlay, setIsOverlay] = useState(false);
  const [isOverlayReq, setIsOverlayReq] = useState(false);
  const [data, setData] =useState([])
  const {user} = useContext(UserContext)
  const navigate = useNavigate()

  const fetchData = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/houses`,{withCredentials:true})
      if(response){
        setData(response.data)
        console.log(response.data)
      }
    } catch (error) {
      console.log(error.message)
    }
  } 
  useEffect(()=>{
    fetchData()
  },[])
  const houses = [
    {
      location: "Beirut",
      houseSpace: "200 m²",
      bedrooms: 3,
      phoneNumber: "79165588",
      price: 500,
    },
    {
      location: "Tripoli",
      houseSpace: "180 m²",
      bedrooms: 2,
      phoneNumber: "70123456",
      price: 400,
    },
    {
      location: "Sidon",
      houseSpace: "220 m²",
      bedrooms: 4,
      phoneNumber: "78945612",
      price: 600,
    },
    {
      location: "Sidon",
      houseSpace: "220 m²",
      bedrooms: 4,
      phoneNumber: "78945612",
      price: 600,
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
        <img src={img} className={styles.img} alt="House" />
        <div className={styles.heroBackgrd}></div>
        <h1 className={styles.h1}>Find safe shelter, Offer a Home.</h1>
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
              <option className={styles.option}>For Sale</option>
              <option className={styles.option}>For Rent</option>
            </select>
          </div>
          <button className={styles.button}> Reset</button>
        </div>
      </div>
      <div className={styles.btnHolder}>
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
      List a house <button className={styles.btnPost} onClick={()=> user ? setIsOverlay(true) : navigate('/login')}>+</button>
      </div>}
      {activeButton ==="Requests" && <div className={styles.add}>
      Ask for a house <button className={styles.btnPost} onClick={()=> user ? setIsOverlayReq(true) : navigate('/login')} >+</button>
      </div>}
      
      <div className={styles.bottom}>



        {activeButton ==="Posts" && houses.map((house, index) => (
          <div className={styles.card} key={index}>
            <img src={img} className={styles.image} alt="House" />
            <div className={styles.cardBottom}>
              <div className={styles.locHolder}>
                <div className={styles.location1}>
                  <LocationOnIcon style={{ opacity: "0.5" }} />
                  <p className={styles.location}>{house.location}</p>
                </div>
                <div className={styles.location1}>
                  <PhoneIcon style={{ opacity: "0.5" }} />
                  <p className={styles.location}>{house.phoneNumber}</p>
                </div>
              </div>
              <div className={styles.bottom2}>
                <div className={styles.price}>
                  <BedIcon style={{ opacity: "0.5" }} />
                  <p style={{ fontSize: "17px" }}>{house.bedrooms}</p>
                </div>
                <div className={styles.price}>{house.houseSpace}</div>
                <div className={styles.price}>
                  <AttachMoneyIcon />
                  <p>{house.price}</p>
                </div>
              </div>
              <div className={styles.check}>
                <p>Check profile</p>
                <ArrowForwardIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
            {activeButton === 'Requests' && requests.map((request, index) => (
          <div className={styles.post1} key={index}>
            {/* Single request without image */}
            <div className={styles.profile}>
              <img src={img} className={styles.image1} alt="Profile" />
              <div className={styles.name}>
                <h3 className={styles.h4}>{request.donorName}</h3>
                <p className={styles.time}>{request.timeAgo}</p>
              </div>
            </div>

            <div className={styles.holder2}>
            <p className={styles.loc}><LocationOnIcon />{request.location}</p>

              <div className={styles.number}>
                <PhoneIcon />
                {request.phoneNumber}
              </div>
            </div>
            <p className={styles.desc}>{request.description}</p>
          </div>
        ))}
        {isOverlay && <section className={styles.overlay}><AddHouse setIsOverlay={setIsOverlay} /></section>}
        {isOverlayReq && <section className={styles.overlay}><Request setIsOverlayReq={setIsOverlayReq} /></section>}
    </div>
  );
}

export default House;
