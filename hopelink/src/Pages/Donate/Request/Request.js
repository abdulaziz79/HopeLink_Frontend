import React, { useState } from 'react';
import styles from './Request.module.css';

function Request({ setIsOverlayReq }) {
  const [formData, setFormData] = useState({
    location: '',
    phoneNumber: '',
    description: '',
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

    if (!formData.location || !formData.phoneNumber || !formData.description) {
      setError("Please fill in all fields.");
      return;
    }

    console.log("Form Data Submitted: ", formData);
    setIsOverlayReq(false); 
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
            name="phoneNumber"
            value={formData.phoneNumber}
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