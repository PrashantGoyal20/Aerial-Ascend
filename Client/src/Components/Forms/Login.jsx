import React, { useContext, useState } from 'react'
import "./login.css"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from "axios"
import Header from '../Footer/Header';
import Footer from '../Footer/Footer';


const Login = () => {
  const server=import.meta.env.VITE_API_URL
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setIsAuthorized, setUser } = useContext(Context)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${server}/auth/login`,
        { email, password}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }

      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthorized(true);
      setUser(data.user);
      navigate('/')

    } catch (error) {
      toast.error("Please fill all Your Credentials ");
    }
  }

  
  return (
    <>
      <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1740937097/x2jgj7ypgocfggr8qyuv.png" height="140px"/>
    
    <div className='login-cover'>
    
      <div className='login-box'>
        <img src='Logo_White.png' />
        <form className='input-containers'>

          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='email-input' />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='password-input' />
          <button type="submit" className='login-submit' onClick={handleLogin}>
            Login
          </button>

        </form>
        <div className='ifNoAccount'>Dont't have an account? <Link to='/register'>Register</Link></div>
        <div></div>
      </div>

    </div>
    <Footer/>
    </>
  )
}

export default Login