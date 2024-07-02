import logoImage from './../../assets/logo.png'
import { useState } from 'react'
import axios from 'axios'
import './Login.css'
import { useNavigate, Link } from 'react-router-dom'
import Registration from '../Registration/Registration.jsx'

const API_ENDPOINT = 'https://server-ivory-pi.vercel.app/api/user'

const Login = ({ setAuthenticated }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    try {
      const response = await apiCall(username, password)
      if (response.data.success) {
        setIsLoggedIn(true)
        console.log('Login Success')
        navigate('/dashboard')
      } else {
        console.error('Login Failed: ', response.data.message)
      }
    } catch (error) {
      setAuthenticated(true)
      navigate('/home')
      console.error('Login failed:', error)
    }
  }

  const toggleRegistration = () => {
    setShowRegistration(!showRegistration)
  }

  return (
    <div className="login-container">
      <img src={logoImage} alt="CodeLingo" width="200" height="200" />
      <h1>CodeLingo</h1>
      {!showRegistration ? (
        <>
          <h2>Log in to your Educator Account</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" placeholder="Username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" placeholder="Password" />
            <button type="submit">Log In</button>
          </form>
          <p>
            Don't have an account? <Link onClick={toggleRegistration}>Register</Link>
          </p>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <Registration />
          <p>
            Already have an account? <Link onClick={toggleRegistration}>Login</Link>
          </p>
        </>
      )}
    </div>
  )
}

const apiCall = () => {
  axios.get(API_ENDPOINT).then(data => {
    console.log(data)
  })
  // return axios.post(API_ENDPOINT, { username, password }, { withCredentials: true });
}

export default Login
