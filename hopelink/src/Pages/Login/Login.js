import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from "./Login.module.css";
import img from "../../assets/images/login.jpg";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { UserContext } from '../../UseContext/UserContext';
import axios from 'axios';

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { setUser, fetchUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");  

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH}/user/login`,
        formData,
        { withCredentials: true }
      );

      if (response) {
        setUser(response.data);
        await fetchUserData();
        console.log("Login successful", response);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={img} className={styles.img} alt="Login" />
        <div className={styles.heroBackgrd}></div>
        <a href='/'><button className={styles.btn}><span className={styles.none}>Back to website</span> <ArrowForwardIcon /></button></a>
        <h1 className={styles.h1}>HopeLink</h1>
        <p className={styles.p}>Creating Connection,<br />Changing Lives</p>
      </div>
      <div className={styles.right}>
        <h2 className={styles.h2}>Access Your Account</h2>
        <p className={styles.p2}>Don't have an account? <Link to="/register" className={styles.register}>Register</Link></p>
        <form className={styles.form} onSubmit={handleLogin}>
          <input type="text" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} required className={styles.input} />
          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleInputChange} required className={styles.input} />

          {/* Display error message */}
          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
