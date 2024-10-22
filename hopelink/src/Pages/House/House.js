import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import styles from "./House.module.css";
import img from "../../assets/images/house.jpg";
import img1 from "../../assets/images/house.avif";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddHouse from "./AddHouse/AddHouse";
import Request from "./Request/Request";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UseContext/UserContext";
import axios from "axios";
import Avatar from '@mui/material/Avatar';


function House() {
  const [activeButton, setActiveButton] = useState('Posts');
  const [isOverlay, setIsOverlay] = useState(false);
  const [isOverlayReq, setIsOverlayReq] = useState(false);
  const [data, setData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const { user } = useContext(UserContext);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchRequests, setSearchRequests] = useState("");
  const [searchPhone, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("")
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);



  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/houses`, { withCredentials: true });
      if (response) {
        setData(response.data.posts);
      }
    } catch (error) {
      console.log(error.message);
    }finally {
      setLoading(false); 
    }
  };

  const fetchRequest = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/requestSupplies/home/requests`);
      if (response) {
        setHomeData(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }finally {
      setLoading2(false); 
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data
    .filter(house => house.location.toLowerCase().includes(searchLocation.toLowerCase()) && house.phone.includes(searchPhone))
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price; 
      } else if (sortOrder === "highToLow") {
        return b.price - a.price;
      } else {
        return 0; 
      }
    });  
    const filteredRequests = homeData.filter(house => house.location.toLowerCase().includes(searchRequests.toLowerCase()));

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
  const resetFilters = async () => {
    setSearchLocation("");
    setSearchRequests("");
    setSearch("");
    setSortOrder("");
    await fetchData(); 
  };

  return (
    <>
      <Helmet>
        <title>Find Safe Shelter | Offer a Home</title>
        <meta name="description" content="Find homes and offer safe shelter to those in need. List a house or request one." />
      </Helmet>

      <div className={styles.container}>
        <section className={styles.top}>
          <img src={img} className={styles.img} alt="A modern house for shelter" />
          <div className={styles.heroBackgrd}></div>
          <h1 className={styles.h1}>Find safe shelter, Offer a Home.</h1>

          <form className={styles.filter} role="search">
            <div className={styles.holder}>
              <label htmlFor="location" className={styles.h3}>Location</label>
              <input
                type="search"
                id="location"
                name="location"
                placeholder="Enter your location"
                className={styles.input}
                value={activeButton === "Posts" ? searchLocation : searchRequests}
                onChange={(e) => activeButton === "Posts" ? setSearchLocation(e.target.value) : setSearchRequests(e.target.value)}
              />
            </div>
            <div className={styles.holder}>
              <label htmlFor="minPrice" className={styles.h3}>Min price</label>
              <input type="number" id="minPrice" name="minPrice" placeholder="Enter min price" className={styles.input} />
            </div>
            <div className={styles.holder}>
              <label htmlFor="maxPrice" className={styles.h3}>Price</label>
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
        </section>

        <div className={styles.btnHolder}>
          <button className={`${styles.btn} ${activeButton === 'Posts' ? styles.active : ''}`} onClick={() => setActiveButton('Posts')}>
            Posts
          </button>
          <button className={`${styles.btn} ${activeButton === 'Requests' ? styles.active : ''}`} onClick={() => {setActiveButton('Requests'); fetchRequest()}}>
            Requests
          </button>
        </div>

        {loading ? (
          <p className={styles.loading}>loading...</p>
        )
        
          :(<>
        {activeButton === "Posts" && (
          <div className={styles.add}>
            <p>List a house</p>
            <button className={styles.btnPost} onClick={() => user ? setIsOverlay(true) : navigate('/login')}>+</button>
          </div>
        )}

        {activeButton === "Requests" && (
          <div className={styles.add}>
            <p>Ask for a house</p>
            <button className={styles.btnPost} onClick={() => user ? setIsOverlayReq(true) : navigate('/login')}>+</button>
          </div>
        )}

        <section className={styles.bottom}>
          {activeButton === "Posts" && Array.isArray(filteredData) && filteredData.map((house, index) => (
            <article className={styles.card} key={index}>
                <img
                  src={
                    Array.isArray(house.images) && house.images.length > 0
                      ? `${process.env.REACT_APP_PATH}/images/${house.images[0]}` 
                      : img1
                  }
                  className={styles.image}
                  alt={`House in ${house.location}`}
                />
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
                <div className={styles.check} onClick={() => navigate(`/profile/${house.userId._id}`)}>
                  <p>Check profile</p>
                  <ArrowForwardIcon />
                </div>
              </div>
            </article>
          ))}
        </section>
        </>)}
          

        {activeButton === 'Requests' && filteredRequests.map((request, index) => (
          <article className={styles.post1} key={index}>
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
              <div className={styles.number}>
                <PhoneIcon />
                {request.phone}
              </div>
            </div>
            <p className={styles.desc}>{request.description}</p>
          </article>
        ))}

        {isOverlay && <section className={styles.overlay}><AddHouse fetchData={fetchData} setIsOverlay={setIsOverlay} /></section>}
        {isOverlayReq && <section className={styles.overlay}><Request fetchRequest={fetchRequest} setIsOverlayReq={setIsOverlayReq} /></section>}
      </div>
    </>
  );
}

export default House;
