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
  const [isOverlayDonate, setIsOverlayDonate] = useState(false);
  const [isOverlayReq, setIsOverlayReq] = useState(false);
  const [data, setData] = useState([]);
  const [requestSupplies, setRequestSupplies] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchRequests, setSearchRequests] = useState("");
  const [searchPhone, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("")
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true); 


  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchDataDonation = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_PATH}/supplies`);
        if (response) {
          setData(response.data.supplies);
          console.log(response.data.supplies)
        }
      } catch (error) {
        console.error(error.message);
      }finally {
        setLoading(false); 
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
      }finally {
        setLoading2(false); 
      }
    };
    
    useEffect(() => {
    fetchDataDonation();
    // fetchRequest();
  }, []);

  const handleImageClick = (image) => {
    setImageBig(image);
  };

  const filteredData = data.filter(house => house.location.toLowerCase().includes(searchLocation.toLowerCase()) && house.phone.includes(searchPhone))
  .sort((a, b) => {
    if (sortOrder === "lowToHigh") {
      return a.price - b.price; 
    } else if (sortOrder === "highToLow") {
      return b.price - a.price;
    } else {
      return 0; 
    }
  });  ;
  const filteredRequests = requestSupplies.filter(house => house.location.toLowerCase().includes(searchRequests.toLowerCase()));

  const resetFilters = async () => {
    setSearchLocation("");
    setSearchRequests("");
    setSearch("");
    setSortOrder("");
    await fetchDataDonation(); 
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
              <input id="location" type="text" name="location" placeholder="Enter your location" className={styles.input}
               value={activeButton === "Posts" ? searchLocation : searchRequests}
               onChange={(e) => activeButton === "Posts" ? setSearchLocation(e.target.value) : setSearchRequests(e.target.value)}
              
              />
            </div>

            <div className={styles.holder}>
              <label className={styles.h3} htmlFor="minPrice">Min price</label>
              <input id="minPrice" type="number" name="minPrice" placeholder="Enter min price" className={styles.input} />
            </div>

            <div className={styles.holder}>
              <label className={styles.h3} htmlFor="price">Price</label>
              <select
                  id="price"
                  className={styles.select}
                  onChange={(e) => {
                  const value = e.target.value;
                  if (value === "Low to high") {
                    setSortOrder("lowToHigh");
                  } else if (value === "High to low") {
                    setSortOrder("highToLow");
                  } else {
                    setSortOrder(""); 
                  }
                }}
              >
              <option value="" className={styles.option}>Default</option>
                <option value="Low to high" className={styles.option}>Low to high</option>
                <option value="High to low" className={styles.option}>High to low</option>
              </select>
            </div>

            <button type="reset" className={styles.button} onClick={resetFilters}>Reset</button>
          </form>
        </header>

        <main className={styles.bottom2}>
          {loading ? (
            <p className={styles.loading}>loading...</p>
          ):(
            <>

<nav className={styles.buttons}>
  <button 
    className={`${styles.btn} ${activeButton === 'Posts' ? styles.active : ''}`} 
    onClick={() => setActiveButton('Posts')}
  >
    Posts
  </button>
  <button 
    className={`${styles.btn} ${activeButton === 'Requests' ? styles.active : ''}`} 
    onClick={() => {setActiveButton('Requests') ; fetchRequest()}}
  >
    Requests
  </button>
</nav>

{activeButton === 'Posts' && (
  <section>
    <div className={styles.add}>
      <p>Donate / Sell</p>
      <button className={styles.btnPost} onClick={() => user ? setIsOverlayDonate(true) : navigate('/login') }>+</button>
    </div>

    {Array.isArray(filteredData) && filteredData.length > 0 && filteredData.map((donation, index) => (
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
          <img src={`${process.env.REACT_APP_PATH}/images/${donation.image}`} onClick={() => handleImageClick(`${process.env.REACT_APP_PATH}/images/${donation.image}`)}  className={styles.postImage} alt="Donation Post" />
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
            </>
          )}

{activeButton === 'Requests' && (
  <section>
    <div className={styles.add}>
      <p>Ask for something</p>
      <button className={styles.btnPost} onClick={() => user ? setIsOverlayReq(true) : navigate('/login')}>+</button>
    </div>

    {filteredRequests.map((request, index) => (
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
    

          {isOverlayDonate && <section className={styles.overlay}><Sell setIsOverlayDonate={setIsOverlayDonate} fetchDataDonation={fetchDataDonation} /></section>}
          {isOverlayReq && <section className={styles.overlay}><Request setIsOverlayReq={setIsOverlayReq} /></section>}
        </main>
      </section>
    </>
  );
}

export default Donate;
