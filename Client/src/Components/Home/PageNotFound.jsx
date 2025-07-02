import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import HomeIcon from '@mui/icons-material/Home';
import Header from '../Footer/Header';
import Footer from '../Footer/Footer';

const PageNotFound = () => {
  return (
    <>
    <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="86px"/>

    <div className='page-not-found-container'>
        <span>404</span>
        <p>Page Not Found !!!</p>
        <Link to='/'><HomeIcon style={{color:"grey", fontSize:"50px"}}/></Link>
    </div>
    <Footer/>
    </>
  )
}

export default PageNotFound