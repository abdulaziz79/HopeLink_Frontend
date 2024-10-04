import React from 'react';
import styles from "./House.module.css";
import img from "../../assets/images/house.jpg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BedIcon from '@mui/icons-material/Bed';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function House() {
  // Step 1: Create an array of house objects
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
              <option className={styles.option}>For Sell</option>
              <option className={styles.option}>For Rent</option>
            </select>
          </div>
          <button className={styles.button}> Reset</button>
        </div>
      </div>

      <div className={styles.bottom}>
        {/* Step 2: Map over the house data */}
        {houses.map((house, index) => (
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
    </div>
  );
}

export default House;
