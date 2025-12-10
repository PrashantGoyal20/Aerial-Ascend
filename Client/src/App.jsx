import React, { useContext, useEffect } from 'react'
import {Toaster} from "react-hot-toast"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Components/Forms/Login.jsx'
import Register from './Components/Forms/Register.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Header from './Components/Footer/Header.jsx'
import Home from './Components/Home/Home.jsx'
import { Context } from './main.jsx'
import axios from 'axios'
import Flights from './Components/Home/Flights.jsx'
import BookTicket from './Components/Flights/BookTicket.jsx'
import PageNotFound from './Components/Home/PageNotFound.jsx'
import Profile from './Components/Home/Profile.jsx'
import EditProfile from './Components/Home/EditProfile.jsx'
import PostFlight from './Components/Flights/PostFlight.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Help from './Components/Home/Help.jsx'
import PaymentSuccessfull from './Components/Flights/PaymentSuccessfull.jsx'
import PaymentFailed from './Components/Flights/PaymentFailed.jsx'
import Manage from './Components/Home/Manage.jsx'
import Search from './Components/Home/Search.jsx'
import PassengerDetails from './Components/Flights/PassengerDetails.jsx'
import MyBookings from './Components/Flights/MyBookings.jsx'
import Us from './Components/Home/Us.jsx'


const App = () => {
  const server=import.meta.env.VITE_API_URL
  const {isAuthorized,setIsAuthorized,user,setUser}=useContext(Context)
  useEffect(()=>{
    const fetchUser=async()=>{
      if(!isAuthorized) return;
      
      try {
        const response = await axios.get(
        `${server}/auth/getuser`,{
          withCredentials: true,
        }
      );
      if(response.data.success==true){
      setUser(response.data.user);
      setIsAuthorized(true);
    }
      } catch (error) {
        console.error(error)
      }
      
    };
    fetchUser();
  },[isAuthorized])
  return (
    <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/search" element={<Search/>}/>
          <Route path="/flights" element={<Flights/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/postflight" element={<PostFlight/>}/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path='/passenger' element={<PassengerDetails/>}/>
          <Route path='/myBookings' element={<MyBookings/>}/>
          <Route path='/bookTicket/:id' element={<BookTicket/>}/>
          <Route path='/helpDesk' element={<Help/>}/>
          <Route path='/flight/paymentSuccess/:id' element={<PaymentSuccessfull/>}/>
          <Route path='/flight/paymentFailed' element={<PaymentFailed/>}/>
          <Route path='/manage' element={<Manage/>}/>
          <Route path='/us' element={<Us/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
        <Toaster/>
    </LocalizationProvider>  
    </BrowserRouter>
  )
}

export default App