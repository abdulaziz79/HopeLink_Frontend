import React, { useState } from 'react';
import styles from './Request.module.css';

function Request({ setIsOverlayReq }) {
  const [formData, setFormData] = useState({
    location: '',
    phoneNumber: '',
    price: '',
    image: null,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.location || !formData.phoneNumber || !formData.price || !formData.image) {
      setError('All fields are required.');
      return;
    }

    console.log('Form Data Submitted:', formData);
    setIsOverlayReq(false); 
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
