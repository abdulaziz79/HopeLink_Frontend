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
  const [ homeData, setHomeData] =useState([])
  const {user} = useContext(UserContext)
  const [searchLocation, setSearchLocation] = useState("");
  const [searchRequests, setSearchRequests] = useState("");
  const [searchPhone, setSearch] = useState("");

  const navigate = useNavigate()

  const fetchData = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/houses`,{withCredentials:true})
      if(response){
        setData(response.data.posts)
        console.log(response.data.posts)

      }
    } catch (error) {
      console.log(error.message)
    }
  } 

  const fetchRequest = async()=>{
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/requestSupplies/home/requests`)
      if(response){
        setHomeData(response.data)
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

  const filteredData = data.filter(house => house.location.toLowerCase().includes(searchLocation.toLowerCase()) &&  house.phone.includes(searchPhone))
  
  
  const filteredRequests = homeData.filter(house => house.location.toLowerCase().includes(searchRequests.toLowerCase()));



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
              value={activeButton ==="Posts" ? searchLocation : searchRequests} 
              onChange={(e) => activeButton ==="Posts" ?setSearchLocation(e.target.value) : setSearchRequests(e.target.value)}
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
         {activeButton ==="Posts" && Array.isArray(filteredData) && filteredData.map((house, index) => (
          <div className={styles.card} key={index}>
            <img src={`${process.env.REACT_APP_PATH}/images/${house.images[0]}`} className={styles.image} alt="House" />
            <div className={styles.cardBottom}>
              <div className={styles.locHolder}>
                <div className={styles.location1}>
                  <LocationOnIcon style={{ opacity: "0.5" }} />
                  <p className={styles.location}>{house.location}</p>
                </div>
                <div className={styles.location1}>
                  <PhoneIcon style={{ opacity: "0.5" }} />
                  <p className={styles.location}>{house.phone}</p>
                </div>
              </div>
              <div className={styles.bottom2}>
                <div className={styles.price}>
                  <BedIcon style={{ opacity: "0.5" }} />
                  <p style={{ fontSize: "17px" }}>{house.bedrooms}</p>
                </div>
                <div className={styles.price}>{house.houseSpace} m²</div>
                <div className={styles.price}>
                  <AttachMoneyIcon />
                  <p>{house.price}</p>
                </div>
              </div>
              <div className={styles.check} onClick={()=>navigate(`/profile/${house.userId._id}`)}>
                <p>Check profile</p>
                <ArrowForwardIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
            {activeButton === 'Requests' && filteredRequests.map((request, index) => (
          <div className={styles.post1} key={index}>
            {/* Single request without image */}
            <div className={styles.profile} onClick={()=>navigate(`/profile/${request.requestedBy._id}`)}>
              <img src={img} className={styles.image1} alt="Profile" />
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
            </div>
            <p className={styles.desc}>{request.description}</p>
          </div>
        ))}
        {isOverlay && <section className={styles.overlay}><AddHouse fetchData={fetchData} setIsOverlay={setIsOverlay} /></section>}
        {isOverlayReq && <section className={styles.overlay}><Request fetchRequest={fetchRequest} setIsOverlayReq={setIsOverlayReq} /></section>}
    </div>
  );
}

export default House;
