import React, { useState } from 'react';
import styles from './PostVolunteer.module.css';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../UseContext/UserContext';

function PostVolunteer({ setIsOverlay }) {
  const {user} = useContext(UserContext)
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    description: '',
    userId: user && user.userId
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const dataToSend = {
      location: formData.location,
      description: formData.description,
      phone: formData.phone,
      userId: user && user.userId 
    };
  
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH}/volunteer/add`,
        dataToSend,
        { withCredentials: true } 
      );
  
      if (response) {
        setFormData({
          location: '',
          description: '',
          phone: '',
          userId: user && user.userId
        });
  
        console.log("Form Data Submitted: ", response.data); 
        setIsOverlay(false); 
      }
    } catch (error) {
      console.log("Error submitting form: ", error.message); 
    }
  };
  
  return (
    <div className={styles.overlay}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Offer a Service</h2>

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
          Submit
        </button>
        <button type="button" className={styles.cancelBtn} onClick={() => setIsOverlay(false)}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}

export default PostVolunteer;
