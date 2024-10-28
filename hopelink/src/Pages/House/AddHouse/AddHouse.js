import React, { useState, useContext } from 'react';
import styles from './AddHouse.module.css';
import axios from 'axios';
import { UserContext } from '../../../UseContext/UserContext';

function AddHouse({ setIsOverlay, fetchData }) {
  const { user } = useContext(UserContext); 

  // Form and state management
  const [formData, setFormData] = useState({
    location: '',
    phone: '',
    bedrooms: 0,
    houseSpace: '',
    price: '',
    userId: user && user.userId,
    images: []
  });

  const [loading, setLoading] = useState(false);
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

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Check if more than 6 images are selected
    if (formData.images.length > 6) {
      setError('You can upload a maximum of 6 images.');
      setLoading(false);
      return; // Exit the function if the error is present
    }

    // Check for other required fields
    if (!formData.location || !formData.phone || !formData.price) {
      setError('All fields are required.');
      setLoading(false);
      return; // Exit the function if any field is missing
    }

    // Create FormData only if there are no errors
    const formDataToSend = new FormData();
    formDataToSend.append('location', formData.location);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('bedrooms', formData.bedrooms);
    formDataToSend.append('houseSpace', formData.houseSpace);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('userId', formData.userId);

    // Append images to FormData
    formData.images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH}/houses/add`, 
        formDataToSend, 
        { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
      );

      if (response) {
        // Reset the form after successful submission
        setFormData({
          location: '',
          phone: '',
          bedrooms: 0,
          houseSpace: '',
          price: '',
          userId: user && user.userId,
          images: [],
        });
        setIsOverlay(false);
        fetchData();
      }
    } catch (error) {
      setError(error.response?.data?.error || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
};



  return (
    <div className={styles.addHouseContainer}>
      <h2>List Your House</h2>
      {error && <p className={styles.error}>{error}</p>} {/* Display error message */}
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
          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
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
