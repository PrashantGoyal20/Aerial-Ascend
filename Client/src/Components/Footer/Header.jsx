import React, { useContext } from 'react'
import "./header.css"
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
    const{setIsAuthorized,isAuthorized,user}=useContext(Context)
    const navigate=useNavigate()
    const handleLogout=async()=>{
        try {
            const response = await axios.get(
              `http://localhost:8000/auth/logout`          
            );
            setIsAuthorized(false);
            navigate("/login");
          } catch (error) {
            console.log(error)
            setIsAuthorized(true);
          }
    }
    return (
        <header className='header-container'>
            <img src='./Logo.png' />
            <nav>
                <ul>
                    <li>
                        <Link to='/' className='header-link'>
                            BOOK
                        </Link>
                    </li>
                    <li>
                        <Link to='/' className='header-link'>
                            MANAGE
                        </Link>
                    </li>
                    {user && user.role=='passenger'?<li>
                        <Link to='/' className='header-link'>
                            HELP
                        </Link>
                    </li>:<li><Link to='/postFlight' className='header-link'>
                            NEW FLIGHT
                        </Link></li>}
                    <li>
                    <Link to='/flights' className='header-link'>
                            FLIGHTS
                        </Link>
                    </li>
                   
                </ul>
                <ul>
                {user && user._id?<li>
                    <Link to='/profile' className='header-links' style={{fontSize:"18px",letterSpacing:"2px",marginBottom:"2px",border:"transparent"}}>
                        {user.name}</Link>
                </li>:<></>}
                {user && user._id?<li>
                    <Link onClick={handleLogout} className='header-links'><AccountCircleRoundedIcon style={{ marginRight: "6px" }} />
                        LOG OUT</Link>
                </li>:<li><Link to='/login' className='header-links'><AccountCircleRoundedIcon style={{ marginRight: "6px" }} />
                        LOG IN</Link>

                    </li>}
                    
                    <li>
                        <Link to='/login' className='header-links'>
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