import React from 'react'
import "./profile.css"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import { useContext } from 'react';
import { Context } from '../../main';
import { Link } from 'react-router-dom';

const Profile = () => {
  const{setIsAuthorized,isAuthorized,user}=useContext(Context)
  return (
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
  )
}

export default Profile