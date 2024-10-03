import React from 'react'
import { useState } from 'react';
import style from "./Contact.module.css"

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        number: '',
        message: ''
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
      };

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div className={style.leftTop}>
            <h1 className={style.h1}>Contact Us</h1>
            <p className={style.text}>Email, call or complete the form to learn how <br />HopeLink can solve you messaging problem</p>
            <p className={style.email}>HopeLink@gmail.com</p>
            <p className={style.number}>79 16 55 88</p>
        </div>
        <div className={style.leftBottom}>
            <div className={style.bottomLeft}>
                <h3 className={style.h3}>Customer support</h3>
                <p className={style.bottomText}>Our support team is available around the clock to address any concerns or queries you may have.</p>
            </div>
            <div className={style.bottomMiddle}>
            <h3 className={style.h3}>Customer support</h3>
                <p className={style.bottomText}>Our support team is available around the clock to address any concerns or queries you may have.</p>
            </div>
            <div className={style.bottomRight}>
            <h3 className={style.h3}>Customer support</h3>
                <p className={style.bottomText}>Our support team is available around the clock to address any concerns or queries you may have.</p>
            </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.rightTop}>
            <h1 className={style.topH1}>Get in Touch</h1>
            <p className={style.topP}>You can reach us anytime</p>
        </div> 
        <div className={style.rightBottom}>
        <form onSubmit={handleSubmit} className={style.form}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          name="firstName" 
          placeholder="First Name" 
          className={style.topInput}
          value={formData.firstName} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="lastName" 
          placeholder="Last Name" 
          className={style.topInput}
          value={formData.lastName} 
          onChange={handleChange} 
        />
      </div>
      
      <div>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className={style.input}
          value={formData.email} 
          onChange={handleChange} 
        />
      </div>
      
      <div>
        <input 
          type="tel" 
          name="number" 
          placeholder="Phone Number" 
          value={formData.number} 
          className={style.input}
          onChange={handleChange} 
        />
      </div>
      
      <div>
        <textarea 
          name="message" 
          placeholder="Message" 
          value={formData.message} 
          className={style.textarea}
          onChange={handleChange} 
        />
      </div>
      
      <div>
        <button type="submit" className={style.button}>Submit</button>
      </div>
    </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
