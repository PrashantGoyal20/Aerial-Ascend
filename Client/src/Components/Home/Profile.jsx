import React from 'react'
import "./profile.css"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';
import Header from '../Footer/Header';
import Footer from '../Footer/Footer';

const Profile = () => {
  const{setIsAuthorized,isAuthorized,user}=useContext(Context)
  return (
    <><Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="85px" />
    <div className='profile-container'>
    <div className='profile-pic'>
      {user.profilePic?<></>:<AccountCircleRoundedIcon  style={{fontSize:"220px",color:"gray",cursor:"pointer"}}/>}
    </div>
      <div>
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <Link to="/editprofile" > <span>Edit Profile </span><TrendingFlatRoundedIcon/></Link>
    </div>
    <Footer/>
    </>
  )
}

export default Profile