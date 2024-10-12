import React, { useState } from 'react';
import styles from './AddHouse.module.css';

function AddHouse({ setIsOverlay }) {
  // Form state
  const [formData, setFormData] = useState({
    location: '',
    phoneNumber: '',
    bedrooms: 0,
    houseSize: '',
    price: '',
    images: []
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.location || !formData.phoneNumber || !formData.price) {
      setError('All fields are required.');
      return;
    }

    if (formData.images.length === 0) {
      setError('Please upload at least one image.');
      return;
    }

    console.log('Form Data Submitted:', formData);


    setIsOverlay(false);
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
            name="phoneNumber"
            value={formData.phoneNumber}
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
            name="houseSize"
            value={formData.houseSize}
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
