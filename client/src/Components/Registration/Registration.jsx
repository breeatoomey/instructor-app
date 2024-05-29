import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import logoImage from "./../../assets/logo.png";

const API_ENDPOINT = "https://server-ivory-pi.vercel.app/api/register";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ENDPOINT, formData);
      if (response.data.success) {
        console.log("Registration Success");
        navigate("/login");
      } else {
        console.error("Registration Failed: ", response.data.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
