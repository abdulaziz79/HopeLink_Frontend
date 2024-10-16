import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import img from '../../assets/images/profile.jpg';
import donationImg from '../../assets/images/donate3.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useContext } from 'react';
import { UserContext } from '../../UseContext/UserContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Profile() {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [houses, setHouses] = useState([]);
  const [showAllImages, setShowAllImages] = useState(Array(3).fill(false)); 
  const [imageBig, setImageBig] = useState(null); 

  // Determine the userId to fetch
  const userIdToFetch = id || (user && user.userId);

  useEffect(() => {
    const fetchRequest = async () => {
      if (userIdToFetch) { // Check if userIdToFetch is defined
        try {
          const response = await axios.get(`${process.env.REACT_APP_PATH}/user/houseAndSupplies/${userIdToFetch}`);
          if (response && response.data) {
            setHouses(response.data);
            console.log(response.data); // Log response data
          }
        } catch (error) {
          console.log(error.message);
        }
      } else {
        console.log("userIdToFetch is undefined");
      }
    };

    fetchRequest();
  }, [userIdToFetch]); // Add userIdToFetch as a dependency



  const handleShowAllImages = (index) => {
    const updatedShowAllImages = [...showAllImages];
    updatedShowAllImages[index] = !updatedShowAllImages[index];
    setShowAllImages(updatedShowAllImages);
  };

  const handleImageClick = (image) => {
    setImageBig(image); 
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <img src={img} className={styles.cover} alt='profile' />
        <div className={styles.heroBackgrd}></div>
        <img src={img} className={styles.profile} alt="Profile" />
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
          <div className={styles.center}>{user && user.name}</div>
          <div className={styles.right}>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Email</p>
              <p className={styles.email}>{ user && user.email}</p>
            </div>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Phone</p>
              <p className={styles.email}>79165588</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.Bottom}>
        {houses.map((donation, index) => (
          <div className={styles.post} key={index}>
            <div className={styles.profile1}>
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

            <p className={styles.desc1}>{donation.description}</p>

            {/* Image Display with Toggle */}
            {donation.images && Array.isArray(donation.images) ? (
              <div className={styles.postImageContainer}>
                {/* Show 3 images max, and toggle "show all" */}
                {donation.images.slice(0, showAllImages[index] ? donation.images.length : 3).map((image, i) => (
                  <img 
                    src={`${process.env.REACT_APP_PATH}/images/${image}`} 
                    className={styles.postImage} 
                    alt={`Donation image ${i}`} 
                    key={i} 
                    onClick={() => handleImageClick(`${process.env.REACT_APP_PATH}/images/${image}`)} 
                  />
                ))}
                {!showAllImages[index] && donation.images.length > 3 && (
                  <div className={styles.plusOverlay} onClick={() => handleShowAllImages(index)}>
                    +{donation.images.length - 3}
                  </div>
                )}
                {showAllImages[index] && (
                  <div className={styles.minus} onClick={() => handleShowAllImages(index)}>
                    -
                  </div>
                )}
              </div>
            ) : (
              donation.images && (
                <img src={donation.images} className={styles.postImage} alt="Donation image" />
              )
            )}
          </div>
        ))}

    
        {imageBig && (
          <div className={styles.imageModal} onClick={() => setImageBig(null)}>
            <img src={imageBig} className={styles.enlargedImage} alt="Enlarged" />
            <div className={styles.closeButton} onClick={() => setImageBig(null)}>X</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
