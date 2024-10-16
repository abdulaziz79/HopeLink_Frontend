import React, { useState } from 'react';
import styles from './Request.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../UseContext/UserContext';
import axios from 'axios';

function Request({ setIsOverlayReq , fetchReuest}) {
  const { user} =useContext(UserContext)
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    description: '',
    requestType:"Home",
    requestedBy:user && user.userId
  });

  const [error, setError] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          requestType:"Home",
          requestedBy:user && user.userId
        })
        console.log("Form Data Submitted: ", formData);
        setIsOverlayReq(false); 
        fetchReuest()
      
      }
    } catch (error) {
      console.log(error.message)
    }

  };

  return (
    <div className={styles.requestContainer}>
      <h2>Request a House</h2>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="e.g., 79123456"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe your needs..."
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Submit</button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setIsOverlayReq(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Request;
