import React, { useState } from 'react';
import styles from './Request.module.css';
import { UserContext } from '../../../UseContext/UserContext';
import { useContext } from 'react';
import axios from 'axios';

function Request({ setIsOverlayReq }) {
  const { user} =useContext(UserContext)
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    description: '',
    requestType:"Supplies",
    requestedBy:user && user.userId
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const respone = axios.post(`${process.env.REACT_APP_PATH}/requestSupplies/add`,formData,{headers:{"Content-Type": "multipart/form-data"},withCredentials:true})
      if(respone){
        setFormData({
          location: '',
          phoneNumber: '',
          description: '',
          requestType:"Supplies",
          requestedBy:user && user.userId
        })
        console.log("Form Data Submitted: ", formData);
        setIsOverlayReq(false); 
      }
    } catch (error) {
      console.log(error.message)
    }

  };

  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Request a Donation or Product</h2>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.formGroup}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what you need"
            className={styles.textarea}
          ></textarea>
        </div>
        <div className={styles.btns}>
        <button type="submit" className={styles.submitBtn}>
          Submit Request
        </button>
        <button type="button" className={styles.cancelBtn} onClick={() => setIsOverlayReq(false)}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}

export default Request;
