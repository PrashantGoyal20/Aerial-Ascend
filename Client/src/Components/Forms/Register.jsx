import React, { useContext, useState } from 'react'
import "./register.css"
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import axios from 'axios';
import Header from '../Footer/Header';

const Register = () => {
  const server=import.meta.env.VITE_API_URL
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState()
  const [role, setRole] = useState("")
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context)
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${server}/auth/register`,
        { name, email, phone, password, role }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }

      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone();
      setRole("");
      setIsAuthorized(true);
      navigate('/')
      console.log(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }
  return (
    <>
    <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1740937097/x2jgj7ypgocfggr8qyuv.png" height="140px"/>
    <div className='register-cover'>
      <div className='register-box'>
        <img src='Logo_White.png' />
        <form className='input-containers'>
          <input type='text' placeholder='Username' value={name} onChange={(e) => setName(e.target.value)} className='name-input' />
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='email-input' />
          <input type='number' placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} className='phone-input' />
          <select className='role-select' value={role} onChange={(e) => setRole(e.target.value)}>
            <option classNamevalue="option">Select </option>
            <option value="passenger" classNamevalue="option">Passenger</option>
            <option value="admin" classNamevalue="option">Flight Provider</option>
          </select>
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='password-input' />

          <button type="submit" className='login-submit' onClick={handleRegister}>
            Register
          </button>

        </form>
        <div className='ifNoAccount'>Already have an account? <Link to='/login'>Login</Link></div>

      </div>

    </div>
    <Footer/>
    </>
  )
}

export default Register