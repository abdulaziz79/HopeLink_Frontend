import React, { useState } from 'react';
import styles from './Sell.module.css';
import { useContext } from 'react';
import { UserContext } from '../../../UseContext/UserContext';
import axios from 'axios';

function Sell({ fetchDataDonation, setIsOverlayDonate }) {
  const {user} =useContext(UserContext)
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    price: '',
    image: '',
    description:'',
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

const handleSubmit = async (e) => {
  e.preventDefault();
  const formDataObj = new FormData();
  
  // Append form data
  formDataObj.append("description", formData.description);
  formDataObj.append("location", formData.location);
  formDataObj.append("phone", formData.phone);
  formDataObj.append("price", formData.price);
  formDataObj.append("image", formData.image);

  try {
    const token = user && user.token; // Assuming user has a token
    const response = await axios.post(
      `${process.env.REACT_APP_PATH}/supplies/add`, 
      formDataObj, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}` // Send token in Authorization header
        },
        withCredentials: true // Make sure cookies are sent if using them for authentication
      }
    );

    if (response) {
      setFormData({
        description: '',
        image: '',
        location: '',
        userId: user && user.userId, 
        price: '',
        phone: ''
      });

      setIsOverlayDonate(false)
      fetchDataDonation()
    }
  } catch (error) {
    console.log(error.message);
    setError("Failed to submit the form");
  }

  console.log('Form Data Submitted:', formData);
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
            name="phone"
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
        <div className={styles.inputGroup}>
          <label>Upload Image <span style={{opacity:"0.7", fontSize:"12px"}}>(Optinal)</span>:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            // required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>Submit</button>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => setIsOverlayDonate(false)} 
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Sell;
