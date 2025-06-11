import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import HomeIcon from '@mui/icons-material/Home';

const PageNotFound = () => {
  return (
    <div className='page-not-found-container'>
        <span>404</span>
        <p>Page Not Found !!!</p>
        <Link to='/'><HomeIcon style={{color:"grey", fontSize:"50px"}}/></Link>
    </div>
  )
}

export default PageNotFound