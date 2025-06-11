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
import { FlightDetails } from './Components/Flights/FlightDetails.jsx'
import Flights from './Components/Home/Flights.jsx'
import BookTicket from './Components/Flights/BookTicket.jsx'
import PageNotFound from './Components/Home/PageNotFound.jsx'
import Profile from './Components/Home/Profile.jsx'
import EditProfile from './Components/Home/EditProfile.jsx'
import PostFlight from './Components/Flights/PostFlight.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const App = () => {
  const {isAuthorized,setIsAuthorized,setUser}=useContext(Context)
  useEffect(()=>{
    const fetchUser=async()=>{
      const response = await axios.get(
        "http://localhost:8000/auth/getuser",{
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      setIsAuthorized(true);
      
    };
    fetchUser();
  },[isAuthorized])
  return (
    <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/flights" element={<Flights/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/postflight" element={<PostFlight/>}/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path='/flightDetails/:id' element={<FlightDetails/>}/>
          <Route path='/bookTicket/:id' element={<BookTicket/>}/>
          <Route path='/*' element={<PageNotFound/>}/>
        </Routes>
        <Toaster/>
        <Footer/>
    </LocalizationProvider>  
    </BrowserRouter>
  )
}

export default App