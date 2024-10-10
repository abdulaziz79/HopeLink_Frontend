import React, { useState } from 'react';
import styles from './Profile.module.css';
import img from '../../assets/images/profile.jpg';
import donationImg from '../../assets/images/donate3.jpg';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function Profile() {

  const [showAllImages, setShowAllImages] = useState(Array(3).fill(false)); 
  const [imageBig, setImageBig] = useState(null); 

  const handleShowAllImages = (index) => {
    const updatedShowAllImages = [...showAllImages];
    updatedShowAllImages[index] = !updatedShowAllImages[index];
    setShowAllImages(updatedShowAllImages);
  };

  const handleImageClick = (image) => {
    setImageBig(image); 
  };

  const donations = [
    {
      donorName: 'Abdelaziz',
      location: 'Tripoli',
      phoneNumber: '79165588',
      price: 500,
      description: 'A used laptop in good condition, perfect for students.',
      timeAgo: '2 days ago',
      postImage: [img, donationImg,],
    },
    {
      donorName: 'Fatima',
      location: 'Beirut',
      phoneNumber: '70123456',
      price: 300,
      description: 'Clothes for newborn babies, clean and well-packed.',
      timeAgo: '1 day ago',
      postImage: null, // No images for this post
    },
    {
      donorName: 'Hassan',
      location: 'Sidon',
      phoneNumber: '78945612',
      price: 0,
      description: 'Old books for high school students.',
      timeAgo: '3 hours ago',
      postImage: [img, donationImg, img, donationImg, img, img],
    },
  ];

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
          <div className={styles.center}>Abdelaziz cherkawi</div>
          <div className={styles.right}>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Email</p>
              <p className={styles.email}>Aboudecharkawi@gmail.com</p>
            </div>
            <div className={styles.singleDesc}>
              <p className={styles.descTp}>Phone</p>
              <p className={styles.email}>79165588</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className={styles.Bottom}>
        {donations.map((donation, index) => (
          <div className={styles.post} key={index}>
            <div className={styles.profile1}>
              <img src={img} className={styles.image} alt="Profile" />
              <div className={styles.name}>
                <h3 className={styles.h4}>{donation.donorName}</h3>
                <p className={styles.time}>{donation.timeAgo}</p>
              </div>
            </div>

            <div className={styles.holder2}>
              <p className={styles.loc}><LocationOnIcon />{donation.location}</p>
              <div className={styles.number}>
                <PhoneIcon />
                {donation.phoneNumber}
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
            {donation.postImage && Array.isArray(donation.postImage) ? (
              <div className={styles.postImageContainer}>
                {/* Show 3 images max, and toggle "show all" */}
                {donation.postImage.slice(0, showAllImages[index] ? donation.postImage.length : 3).map((image, i) => (
                  <img 
                    src={image} 
                    className={styles.postImage} 
                    alt={`Donation image ${i}`} 
                    key={i} 
                    onClick={() => handleImageClick(image)} 
                  />
                ))}
                {!showAllImages[index] && donation.postImage.length > 3 && (
                  <div className={styles.plusOverlay} onClick={() => handleShowAllImages(index)}>
                    +{donation.postImage.length - 3}
                  </div>
                )}
                {showAllImages[index] && (
                  <div className={styles.minus} onClick={() => handleShowAllImages(index)}>
                    -
                  </div>
                )}
              </div>
            ) : (
              donation.postImage && (
                <img src={donation.postImage} className={styles.postImage} alt="Donation image" />
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
