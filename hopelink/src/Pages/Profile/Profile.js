import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import img from '../../assets/images/profile.jpg';
import img1 from '../../assets/images/profilee.jpeg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import { useContext } from 'react';
import { UserContext } from '../../UseContext/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddHouse from '../House/AddHouse/AddHouse';
import Sell from '../Donate/Sell/Sell';

function Profile() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [houses, setHouses] = useState([]);
  const [donations, setDonation] = useState([]);
  const [volunteers, setVolunteer] = useState([]);
  const [showAllImages, setShowAllImages] = useState(Array(3).fill(false)); 
  const [imageBig, setImageBig] = useState(null); 
  const [userID, setUserID] = useState({});
  const [loading, setLoading] = useState(true);  
  const [isOverlay, setIsOverlay] = useState(false);
  const [isOverlayDonate, setIsOverlayDonate] = useState(false);
  const [activeButton, setActiveButton] = useState('House');
  const navigate = useNavigate();

  const userIdToFetch = id || (user && user.userId);

  // Individual menus for each post
  const [menuState, setMenuState] = useState({ open: false, anchorEl: null, selectedHouseId: null });

  const handleClick = (event, houseId) => {
    setMenuState({
      open: true,
      anchorEl: event.currentTarget,
      selectedHouseId: houseId
    });
  };

  const handleClose = () => {
    setMenuState({ open: false, anchorEl: null, selectedHouseId: null });
  };

  const handleDelete = async (houseId) => {
    console.log("Delete clicked");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_PATH}/houses/delete/${houseId}`, { withCredentials: true });
      if (response) {
        console.log("Deleted successfully");
        fetchData();
      }
    } catch (error) {
      console.log(error.message);
    }
    handleClose();
  };

  const handleDeleteDonation = async (donationId) => {
    console.log("Delete clicked");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_PATH}/supplies/delete/${donationId}`, { withCredentials: true });
      if (response) {
        console.log("Deleted successfully");
        fetchDataDonation();
      }
    } catch (error) {
      console.log(error.message);
    }
    handleClose();
  };

  const handleDeleteVolunteer = async (volunteerId) => {
    console.log("Delete clicked");
    try {
      const response = await axios.delete(`${process.env.REACT_APP_PATH}/volunteer/delete/${volunteerId}`, { withCredentials: true });
      if (response) {
        console.log("Deleted successfully");
        fetchVolunteer();
      }
    } catch (error) {
      console.log(error.message);
    }
    handleClose();
  };

  const fetchData = async () => {
    if (userIdToFetch) { 
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH}/user/houseAndSupplies/${userIdToFetch}`);
        if (response && response.data) {
          setHouses(response.data);
          console.log("houses", response.data); 
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); 
      }
    } else {
      console.log("userIdToFetch is undefined");
      setLoading(false); 
    }
  };
  const fetchDataDonation = async () => {
    if (userIdToFetch) { 
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH}/user/donation/${userIdToFetch}`);
        if (response && response.data) {
          setDonation(response.data);
          console.log("donation",response.data); 
        }
        } catch (error) {
          console.log(error.message);
        } finally {
          setLoading(false); 
        }
      } else {
        console.log("userIdToFetch is undefined");
        setLoading(false); 
      }
    };
    useEffect(() => {
      if (userIdToFetch) {
        const fetchUser = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_PATH}/user/${userIdToFetch}`);
            if (response) {
              setUserID(response.data);
              console.log(response.data);
            }
          } catch (error) {
            console.log(error.message);
          }
        };
  
        fetchUser();
      }
    }, [userIdToFetch]);
    useEffect(() => {

    if (userIdToFetch) {
      fetchDataDonation();
    } else {
      setLoading(false);
    }
  }, [userIdToFetch]);

  const fetchVolunteer = async () => {
    if (userIdToFetch) { 
      try {
        const response = await axios.get(`${process.env.REACT_APP_PATH}/user/volunteer/${userIdToFetch}`);
        if (response && response.data) {
          setVolunteer(response.data);
          console.log("volu",response.data); 
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false); 
      }
    } else {
      console.log("userIdToFetch is undefined");
      setLoading(false); 
    }
  };
  
  useEffect(() => {
    if (userIdToFetch) {
      fetchVolunteer();
    } else {
      setLoading(false);
    }
  }, [userIdToFetch]);

  useEffect(() => {
    if (userIdToFetch) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [userIdToFetch]);
  

  const handleShowAllImages = (index) => {
    const updatedShowAllImages = [...showAllImages];
    updatedShowAllImages[index] = !updatedShowAllImages[index];
    setShowAllImages(updatedShowAllImages);
  };

  const handleImageClick = (image) => {
    setImageBig(image); 
  };

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
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={img} className={styles.cover} alt='profile' />
        <div className={styles.heroBackgrd}></div>
        <img src={img1} className={styles.profile} alt="Profile" />
      </div>

      <div className={styles.bottom}>
        <div className={styles.desc}>
          <div className={styles.left}>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Total Posts</p>
              <p className={styles.descBottom}>5</p>
            </div>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Requests</p>
              <p className={styles.descBottom}>5</p>
            </div>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Posts</p>
              <p className={styles.descBottom}>5</p>
            </div>
          </div>
          <div className={styles.center}>{userID && userID.name}</div>
          <div className={styles.right}>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Email</p>
              <p className={styles.email}>{userID && userID.email}</p>
            </div>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Phone</p>
              <p className={styles.email}>79165588</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.Bottom}>
        <div className={styles.filter}>
          <button className={`${styles.filterBtn} ${activeButton === 'House' ? styles.active : ''}`} onClick={() => setActiveButton("House")}>House</button>
          <button className={`${styles.filterBtn} ${activeButton === 'Donation' ? styles.active : ''}`} onClick={() => setActiveButton("Donation")}>Donation</button>
          <button className={`${styles.filterBtn} ${activeButton === 'Volunteer' ? styles.active : ''}`} onClick={() => setActiveButton("Volunteer")}>Volunteer</button>
        </div>
        { activeButton === "House" && user && user.userId === userID._id && (
          <div className={styles.add}>
          <p>List a house</p>
          <button className={styles.btnPost} onClick={() =>  setIsOverlay(true) }>+</button>
        </div>
        )}
         { activeButton === "Donation" && user && user.userId === userID._id && (
             <div className={styles.add}>
             <p>Donate/Sell</p>
             <button className={styles.btnPost} onClick={() => user ? setIsOverlayDonate(true) : navigate('/login')}>+</button>
           </div>
           )}
            { activeButton === "Volunteer" && user && user.userId === userID._id && (
             <div className={styles.add}>
             <p>Offer a service</p>
             <button className={styles.btnPost} onClick={() => user ? setIsOverlayDonate(true) : navigate('/login')}>+</button>
           </div>
           )}
      
        {loading ? (
          <p className={styles.loading}>loading...</p>
        ) : (
          <>
            {activeButton === "House" && houses.map((house, index) => (
            

              <div className={styles.post} key={house._id}>
                <div className={styles.profile1}>
                  <Avatar
                    alt={house.userId.name}
                    sx={{ cursor: "pointer", backgroundColor: "lightGrey", color: "#163357", height: "4rem", width: "4rem" }}
                  >
                    {house.userId.name.charAt(0).toUpperCase()} 
                  </Avatar>
                  <div className={styles.name}>
                    <h3 className={styles.h4}>{house.userId.name}</h3>
                    <p className={styles.time}>{calculateTimeAgo(house.updatedAt)}</p>
                  </div>
                  {user && user.userId === house.userId._id && (
                    <>
                      <MoreVertIcon
                        className={styles.more}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, house._id)}
                      />
                      <Menu
                        id="simple-menu"
                        anchorEl={menuState.anchorEl}
                        open={menuState.open && menuState.selectedHouseId === house._id}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleDelete(house._id)}>Delete</MenuItem>
                      </Menu>
                </>
              )}
            </div>
            

            <div className={styles.holder2}>
              <p className={styles.loc}><LocationOnIcon />{house.location}</p>
              <div className={styles.number}>
                <PhoneIcon />
                {house.phone}
              </div>
              {house.price > 0 ? (
                <div className={styles.price}>
                  <AttachMoneyIcon />
                  {house.price}
                </div>
              ):<div className={styles.price}>Free</div>}
               <div className={styles.bottom2}>
                  <div className={styles.price}>
                    <BedIcon style={{ opacity: "0.5" }} />
                    <p style={{ fontSize: "17px" }}>{house.bedrooms}</p>
                  </div>
                  <div className={styles.price}>{house.houseSpace} m²</div>
               
                </div>
            </div>

            <p className={styles.desc1}>{house.description}</p>

            {/* Image Display with Toggle */}
            {house.images && Array.isArray(house.images) ? (
              <div className={styles.postImageContainer}>
                {house.images.slice(0, showAllImages[index] ? house.images.length : 3).map((image, i) => (
                  <img 
                    src={`${process.env.REACT_APP_PATH}/images/${image}`} 
                    className={styles.postImage} 
                    alt={`Donation image ${i}`} 
                    key={i} 
                    onClick={() => handleImageClick(`${process.env.REACT_APP_PATH}/images/${image}`)} 
                  />
                ))}
                {!showAllImages[index] && house.images.length > 3 && (
                  <div className={styles.plusOverlay} onClick={() => handleShowAllImages(index)}>
                    +{house.images.length - 3}
                  </div>
                )}
                {showAllImages[index] && (
                  <div className={styles.minus} onClick={() => handleShowAllImages(index)}>
                    -
                  </div>
                )}
              </div>
            ) : (
              house.images && (
                <img src={house.images} className={styles.postImage} alt="Donation image" />
              )
            )}
          </div>
          
        ))}
        </>
      )}
        {activeButton==="Donation" && donations.map((donation, index)=>(
           

           <article className={styles.donationPost} key={index}>
           <div className={styles.donationProfile} onClick={() => navigate(`/profile/${donation.userId._id}`)}>
           <Avatar
             alt={donation.userId.name}
              sx={{ cursor: "pointer", backgroundColor: "lightGrey", color: "#163357", height: "4rem", width: "4rem" }}
               >
         {donation.userId.name.charAt(0).toUpperCase()} 
            </Avatar>  
             <div className={styles.donationName}>
               <h3 className={styles.h4}>{donation.userId.name}</h3>
               <p className={styles.time}>{calculateTimeAgo(donation.createdAt)}</p>
             </div>
             {user && user.userId === donation.userId._id && (
                    <>
                      <MoreVertIcon
                        className={styles.more}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, donation._id)}
                      />
                      <Menu
                        id="simple-menu"
                        anchorEl={menuState.anchorEl}
                        open={menuState.open && menuState.selectedHouseId === donation._id}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleDeleteDonation(donation._id)}>Delete</MenuItem>
                      </Menu>
                </>
              )}
           </div>

           <div className={styles.holder2}>
             <p className={styles.loc}><LocationOnIcon />{donation.location}</p>
             <p className={styles.number}><PhoneIcon />{donation.phone}</p>
             {donation.price > 0 && (
               <p className={styles.price}><AttachMoneyIcon />{donation.price}</p>
             )}
           </div>

           <p className={styles.donationDesc}>{donation.description}</p>

           {donation.image && (
             <img src={`${process.env.REACT_APP_PATH}/images/${donation.image}`} onClick={() => handleImageClick(`${process.env.REACT_APP_PATH}/images/${donation.image}`)}  className={styles.donationPostImage} alt="Donation Post" />
           )}

           {imageBig && (
             <div className={styles.imageModal} onClick={() => setImageBig(null)}>
               <img src={imageBig} className={styles.enlargedImage} alt="Enlarged" />
               <div className={styles.closeButton} onClick={() => setImageBig(null)}>X</div>
             </div>
           )}
         </article>
        
        ))}
        {activeButton === "Volunteer" && volunteers.map((volunteer, index)=>(
          
          <article className={styles.donationPost} key={index}>
          <div className={styles.donationProfile} onClick={() => navigate(`/profile/${volunteer.userId._id}`)}>
          <Avatar
            alt={volunteer.userId.name}
             sx={{ cursor: "pointer", backgroundColor: "lightGrey", color: "#163357", height: "4rem", width: "4rem" }}
              >
        {volunteer.userId.name.charAt(0).toUpperCase()} 
           </Avatar>  
            <div className={styles.donationName}>
              <h3 className={styles.h4}>{volunteer.userId.name}</h3>
              <p className={styles.time}>{calculateTimeAgo(volunteer.createdAt)}</p>
            </div>
            {user && user.userId === volunteer.userId._id && (
                    <>
                      <MoreVertIcon
                        className={styles.more}
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, volunteer._id)}
                      />
                      <Menu
                        id="simple-menu"
                        anchorEl={menuState.anchorEl}
                        open={menuState.open && menuState.selectedHouseId === volunteer._id}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={() => handleDeleteVolunteer(volunteer._id)}>Delete</MenuItem>
                      </Menu>
                </>
              )}
          </div>

          <div className={styles.holder2}>
            <p className={styles.loc}><LocationOnIcon />{volunteer.location}</p>
            <p className={styles.number}><PhoneIcon />{volunteer.phone}</p>
            {volunteer.price > 0 && (
              <p className={styles.price}><AttachMoneyIcon />{volunteer.price}</p>
            )}
          </div>

          <p className={styles.donationDesc}>{volunteer.description}</p>
      </article>
     
        ))}

        {imageBig && (
          <div className={styles.imageModal} onClick={() => setImageBig(null)}>
            <img src={imageBig} className={styles.enlargedImage} alt="Enlarged" />
            <div className={styles.closeButton} onClick={() => setImageBig(null)}>X</div>
          </div>
        )}
      </div>
      {isOverlay && <section className={styles.overlay}><AddHouse fetchData={fetchData} setIsOverlay={setIsOverlay} /></section>}
      {isOverlayDonate && <section className={styles.overlay}><Sell fetchDataDonation={fetchDataDonation} setIsOverlayDonate={setIsOverlayDonate} /></section>}

    </div>
  );
}

export default Profile;
