import React, { useState } from 'react';
import styles from './AddHouse.module.css';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../UseContext/UserContext';

function AddHouse({ setIsOverlay }) {
  const { user } = useContext(UserContext); 

  // Form state
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    bedrooms: 0,
    houseSpace: '',
    price: '',
    user :user && user.userId,
    images: []
  });

  console.log(user)

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      setError('You can upload a maximum of 6 images.');
    } else {
      setFormData((prevData) => ({ ...prevData, images: files }));
      setError(null);
    }
  };

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!formData.location || !formData.phone || !formData.price) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.post (`${process.env.REACT_APP_PATH}/houses/add`,formData, {headers:{'Content-Type':"multipart/form-data"}} )
      if(response){
        setFormData({
          location: '',
          image: '',
          phone: '',
          bedrooms: '',
          houseSpace:'',
          price:"",
          userId:user && user.userId, 
        });
        console.log('Form Data Submitted:', formData);
        setIsOverlay(false);
      }
    } catch (error) {
      console.log(error.message)
    }

  };

  return (
    <div className={styles.addHouseContainer}>
      <h2>List Your House</h2>
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
          <label>Number of Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            min="1"
            placeholder="e.g., 3"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>House Size (in square meters):</label>
          <input
            type="text"
            name="houseSpace"
            value={formData.houseSpace}
            onChange={handleChange}
            placeholder="e.g., 200 m²"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Price (USD):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            placeholder="e.g., 500"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Upload Images (Max 6):</label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {formData.images.length > 0 && (
            <p>{formData.images.length} image(s) selected</p>
          )}
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

export default AddHouse;
