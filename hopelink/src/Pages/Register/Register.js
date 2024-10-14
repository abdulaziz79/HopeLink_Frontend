import React, { useState, useContext } from 'react';
import styles from "./Register.module.css";
import img from "../../assets/images/login.jpg";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../UseContext/UserContext';
import axios from "axios";

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { setUser, fetchUserData } = useContext(UserContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the formData as JSON in the body
      const response = await axios.post(
        'http://localhost:5001/user/register',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { 'Content-Type': 'application/json' }, // Sending data as JSON
          withCredentials: true, // If you need to handle cookies
        }
      );

      console.log("response", response);
      setUser(response.data);
      fetchUserData();
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log("Email already exists");
      } else {
        console.log(error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={img} className={styles.img} alt="Login" />
        <div className={styles.heroBackgrd}></div>
        <a href="/"><button className={styles.btn}><span className={styles.none}>Back to website</span> <ArrowForwardIcon /></button></a>
        <h1 className={styles.h1}>HopeLink</h1>
        <p className={styles.p}>Creating Connection,<br />Changing Lives</p>
      </div>
      <div className={styles.right}>
        <h2 className={styles.h2}>Create an account</h2>
        <p className={styles.p2}>Already have an account? <Link to="/login" className={styles.register}>Login</Link></p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.nameEmail}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full name"
              required
              className={styles.input}
            />
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            required
            className={styles.input}
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Create account</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
