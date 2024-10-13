import React, { useState } from 'react';
import styles from './Sell.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../UseContext/UserContext';
import axios from 'axios';

function Sell({ setIsOverlay }) {
  const {user} =useContext(UserContext)
  const [formData, setFormData] = useState({
    location: '',
    phoneNumber: '',
    price: '',
    image: '',
    userId: user&& user.userId, 

  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({
        ...prevData,
        image: e.target.files[0],
    }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = axios.post(`${process.env.REACT_APP_PATH}/supplies/`)
    } catch (error) {
      
    }

    console.log('Form Data Submitted:', formData);
    setIsOverlay(false); 
  };

  return (
    <div className={styles.sellContainer}>
      <h2>Sell or Donate</h2>
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
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            placeholder="e.g., 79123456"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g., 100"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Submit</button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setIsOverlay(false)} 
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sell;
