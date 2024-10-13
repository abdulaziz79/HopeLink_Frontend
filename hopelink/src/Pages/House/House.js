import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./House.module.css";
import img from "../../assets/images/house.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AddHouse from "./AddHouse/AddHouse";
import Request from "./Request/Request";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UseContext/UserContext";

function House() {
  const [activeButton, setActiveButton] = useState('Posts');
  const [isOverlay, setIsOverlay] = useState(false);
  const [isOverlayReq, setIsOverlayReq] = useState(false);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [houses, setHouses] = useState([]);
  const [location, setLocation] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchHouses = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_PATH}/houses/`, {
        params: { location, governorate, minPrice, maxPrice }
      });
      
      console.log(response.data); // Log response for inspection
  
      // Access the posts array
      if (Array.isArray(response.data.posts)) {
        setHouses(response.data.posts); // Set houses to the posts array
      } else {
        console.error("Expected an array but received:", response.data.posts);
        setHouses([]); // Handle non-array case
      }
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  };
  
  useEffect(() => {
    fetchHouses(); // Fetch houses initially or based on input
  }, [location, governorate, minPrice, maxPrice]);

  const resetFilters = () => {
    setLocation('');
    setGovernorate('');
    setMinPrice('');
    setMaxPrice('');
    fetchHouses(); // Re-fetch with cleared filters
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={img} className={styles.img} alt="House" />
        <div className={styles.heroBackgrd}></div>
        <h1 className={styles.h1}>Find safe shelter, Offer a Home.</h1>
        <div className={styles.filter}>
          <div className={styles.holder}>
            <h3 className={styles.h3}>Location</h3>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className={styles.input}
            />
          </div>
          <div className={styles.holder}>
            <h3 className={styles.h3}>Governorate</h3>
            <input
              type="text"
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              placeholder="Enter governorate"
              className={styles.input}
            />
          </div>
          <div className={styles.holder}>
            <h3 className={styles.h3}>Min Price</h3>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="Enter min price"
              className={styles.input}
            />
          </div>
          <div className={styles.holder}>
            <h3 className={styles.h3}>Max Price</h3>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="Enter max price"
              className={styles.input}
            />
          </div>
          <button onClick={fetchHouses} className={styles.button}>Search</button>
          <button onClick={resetFilters} className={styles.button}>Reset</button>
        </div>
      </div>

      {/* Render houses */}
      <div className={styles.bottom}>
  {activeButton === "Posts" && Array.isArray(houses) && houses.map((house, index) => (
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
        <div className={styles.check}>
          <p>Check profile</p>
          <ArrowForwardIcon />
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Overlay for adding house or requests */}
      {isOverlay && (
        <section className={styles.overlay}>
          <AddHouse setIsOverlay={setIsOverlay} />
        </section>
      )}
      {isOverlayReq && (
        <section className={styles.overlay}>
          <Request setIsOverlayReq={setIsOverlayReq} />
        </section>
      )}
    </div>
  );
}

export default House;
