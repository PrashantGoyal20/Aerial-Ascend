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
import Loading from './Components/Footer/loading.jsx'
import { useCallback } from 'react'
import toast from 'react-hot-toast'


const App = () => {
  const server=import.meta.env.VITE_API_URL
  const {isAuthorized,setIsAuthorized,user,setUser,loading,setLoading}=useContext(Context)
  const fetchUser=useCallback(async()=>{
    setLoading(true)
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
    if(response.data.success==false){
      setIsAuthorized(false);
    }
      } catch (error) {
        console.error(error)
      }finally{
        setLoading(false)
      }
      
    },[setIsAuthorized])
  useEffect(()=>{
    
    fetchUser();
    console.log(user)
  },[fetchUser])


  return (
    <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/search" element={<Search/>}/>
          
          <Route path='/manage' element={<Manage/>}/>
          <Route path='/us' element={<Us/>}/>
          <Route path='/*' element={<PageNotFound/>}/>



          <Route path="/flights" element={<Flights/>}/>
          <Route path="/profile" element={<Loading><Profile/></Loading>}/>
          <Route path="/postflight" element={<Loading><PostFlight/></Loading>}/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path='/passenger' element={<Loading><PassengerDetails/></Loading>}/>
          <Route path='/myBookings' element={ <Loading><MyBookings/></Loading>}/>
          <Route path='/bookTicket/:id' element={<Loading><BookTicket/></Loading>}/>
          <Route path='/helpDesk' element={<Loading><Help/></Loading>}/>
          <Route path='/flight/paymentSuccess/:id' element={<Loading><PaymentSuccessfull/></Loading>}/>
          <Route path='/flight/paymentFailed' element={<Loading><PaymentFailed/></Loading>}/>
        </Routes>
        <Toaster/>
    </LocalizationProvider>  
    </BrowserRouter>
  )
}

export default App