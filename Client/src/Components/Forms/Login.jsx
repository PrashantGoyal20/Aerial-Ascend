import React, { useContext, useState } from 'react'
import "./login.css"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setIsAuthorized, setUser } = useContext(Context)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/auth/login",
        { email, password}, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }

      );
      console.log(data);
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setIsAuthorized(true);
      setUser(data.user);
      navigate('/')
      console.log(data.message);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const handleSubmit = async (e) => {
    e.prevenDeafault()
    try {
      const { data } = await axios.post("http://localhost:3000/user/login",
        { email, password, role }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }

      );
      console.log(data);
      toast.success(data.message);
    } catch (error) {

    }
  }
  return (
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
  )
}

export default Login