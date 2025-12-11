import React, { useContext } from 'react'
import "./header.css"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = ( {src,height}) => {
    const server=import.meta.env.VITE_API_URL
    const{setIsAuthorized,isAuthorized,user,setUser}=useContext(Context)
    const navigate=useNavigate()
    
    const handleLogout=async()=>{
        try {
            const response = await axios.get(`${server}/auth/logout`, { withCredentials: true });
            setIsAuthorized(false);
            setUser({})
            navigate('/login');
          } catch (error) {
            setIsAuthorized(true);
          }
    }
    return (
        <header className='header-container'>
            <Link to='/'><img src={src} style={{height:height}} /></Link>
            <nav>
                <ul>
                     {user && user.id?<li>
                        <Link to='/myBookings' className='header-link'>
                            MY BOOKINGS
                        </Link>
                    </li>:<></>}
                    <li>
                        <Link to='/manage' className='header-link'>
                            MANAGE
                        </Link>
                    </li>
                    {user && user.role=='admin'?<li>
                        <Link to='/postFlight' className='header-link'>
                            NEW FLIGHT
                        </Link>
                    </li>:<li><Link to='/helpDesk' className='header-link'>
                            HELP
                        </Link></li>}
                    <li>
                    <Link to='/search' className='header-link'>
                            FLIGHTS
                        </Link>
                    </li>
                   
                </ul>
                <ul>
                {(isAuthorized && user) ?<li>
                    <Link to='/profile' className='header-profile-btn' style={{fontSize:"18px",letterSpacing:"2px",marginBottom:"2px",border:"transparent"}}>
                        {user?.name.split('')[0]}</Link>
                </li>:<></>}
                {(isAuthorized && user) ?<li>
                    <Link onClick={handleLogout} className='header-links'><AccountCircleRoundedIcon style={{ marginRight: "6px" }} />
                        LOG OUT</Link>
                </li>:<li><Link to='/login' className='header-links'><AccountCircleRoundedIcon style={{ marginRight: "6px" }} />
                        LOG IN</Link>

                    </li>}
                    
                    <li>
                        <Link to='/us' className='header-links'>
                            <LanguageRoundedIcon style={{ marginRight: "6px" }} />
                            US
                        </Link>

                    </li>
                </ul>
            </nav>

        </header>
    )
}

export default Header