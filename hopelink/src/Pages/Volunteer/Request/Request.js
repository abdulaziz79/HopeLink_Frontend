import React, { useState } from 'react';
import styles from './Request.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../UseContext/UserContext';
import axios from 'axios';

function Request({ setIsOverlayReq, fetchData }) {
  const { user} =useContext(UserContext)
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    image: '',
    description:"",
    requestType:"Volunteer",
    requestedBy :user && user.userId
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create a FormData object
    const formDataToSend = new FormData();
    
    // Append form fields to the FormData object
    formDataToSend.append('location', formData.location);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('image', formData.image); 
    formDataToSend.append('description', formData.description);
    formDataToSend.append('requestType', formData.requestType);
    formDataToSend.append('requestedBy', user.userId);

    try {
      // Make the POST request with FormData
      const response = await axios.post(`${process.env.REACT_APP_PATH}/requestSupplies/add`, formDataToSend, {
        withCredentials: true
      });

      if (response) {
        setFormData({
          location: '',
          phone: '',
          image: '',
          description: '',
          requestType: "Volunteer",
          requestedBy: user && user.userId
        });

        console.log("Form Data Submitted: ", formData);
        setIsOverlayReq(false); 
        fetchData()
      }
    } catch (error) {
      console.log(error.message);
    }
};

  return (
    <div className={styles.sellContainer}>
      <h2>Request a Service</h2>
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
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="e.g., 79123456"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            
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
