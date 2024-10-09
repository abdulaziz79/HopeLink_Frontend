import React from 'react'
import styles from "./Profile.module.css"
import img from "../../assets/images/profile.jpg"
import donationImg from "../../assets/images/donate3.jpg";  // Reusing the test image for posts
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


function Profile() {
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
          postImage: donationImg,
        }
      ];
  return (
    <div className={styles.container}>
        <div className={styles.top}>
            <img src={img} className={styles.cover} alt= 'profile' />
            <div className={styles.heroBackgrd}></div>
            <img src={img} className={styles.profile} />
            </div>
            <div className={styles.bottom}>
            <div className={styles.desc}>
                <div className={styles.left}>
                    <div className={styles.singleDesc}>
                    <p className={styles.descTp}>
                        Total Posts
                    </p>
                    <p className={styles.descBottom}>
                        5
                    </p>
                    </div>
                    <div className={styles.singleDesc}>
                    <p className={styles.descTp}>
                        Requests
                    </p>
                    <p className={styles.descBottom}>
                        5
                    </p>
                    </div>
                    <div className={styles.singleDesc}>
                    <p className={styles.descTp}>
                        Posts
                    </p>
                    <p className={styles.descBottom}>
                        5
                    </p>
                    </div>
                </div>
                <div className={styles.center}>
                 
                    Abdelaziz cherkawi
                    
                   
                </div>
                <div className={styles.right}>
                <div className={styles.singleDesc}>
                      <p className={styles.descTp}>Email</p>
                      <p className={styles.email}> Aboudecharkawi@gmail.com </p>

                    </div>
                    <div className={styles.singleDesc}>
                      <p className={styles.descTp}>Phone</p>
                      <p className={styles.email}> 79165588 </p>

                    </div>
                </div>
            </div>
        </div>
        <div className={styles.Bottom}>
        { donations.map((donation, index) => (
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
                
            {donation.postImage && <img src={donation.postImage} className={styles.postImage} alt="Donation Post" />}
          </div>
        ))}
        </div>
    </div>
  )
}

export default Profile
