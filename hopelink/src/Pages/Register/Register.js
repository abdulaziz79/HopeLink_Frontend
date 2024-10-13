import React from 'react'
import styles from "./Register.module.css"
import img from "../../assets/images/login.jpg"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { Link } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../UseContext/UserContext';
import axios from "axios";


function Register() {
  const [formData, setFormData]= useState({
    name: '',
    email:'',
    image:'',
    password:'',

  });
  
  const navigate = useNavigate();
  const { user , setUser, fetchUserData } = useContext(UserContext);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e)=>{
    // console.log(e.target.files[0])
    setFormData((prev)=>({
      ...prev,
      image:e.target.files[0]
    }))
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/user/register', {...formData, image: formData.image},{headers: {'Content-Type': 'multipart/form-data'}},{withCredentials:true});
      setUser(response.data)
      fetchUserData()
      navigate('/')
      console.log(response.data)
    } catch (error) {
      if(error.response && error.response.status === 401) {
        console.log("email already there")
      } else {

        console.log(error.message);
      }
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
        <img src={img} className={styles.img} />
        <div className={styles.heroBackgrd}></div>
        <a href='/'><button className={styles.btn}><span className={styles.none}>Back to website</span> <ArrowForwardIcon /></button></a>
        <h1 className={styles.h1}>HopeLink</h1>
        <p className={styles.p}>Creating Connection,<br />Changing Lives</p>
      </div>
      <div className={styles.right}>
        <h2 className={styles.h2}>Create an account</h2>
        <p className={styles.p2}>Already have an account? <Link to="/login" className={styles.register}>login</Link></p>
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.nameEmail}>
                <input type='text' id='text' name="name" value={formData.name}onChange={handleInputChange} placeholder='Full name' required className={styles.input}/>
                {/* <input type='text' id='text' name="last name" placeholder='Last name' required className={styles.input2}/> */}

            </div>
          <input  type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder='Enter your email' required className={styles.input} />
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} placeholder='Enter your password' required className={styles.input} />
          {/* <input
            type="file"
            name="image"
            // accept="image/*"
            onChange={handleImageChange}
          /> */}
          <button type="submit" className={styles.button}>Create account</button>
        </form>
      </div>
    </div>
  )
}

export default Register
