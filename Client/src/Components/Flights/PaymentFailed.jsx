import React from 'react'
import Header from '../Footer/Header'
import "./unsuccess.css"
import { Link } from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
import Footer from '../Footer/Footer';

const PaymentFailed = () => {
  return (
    <>
        <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="85px"/>
        <div className='unsuccess-conatiner'>
           
            <CancelIcon style={{color:"red",fontSize:"150px"}}/>
                <p>
                    We are sorry for the inconvinience but your Payment Has failed due to some technical error.
                </p>
                <p>
                    If any amount is deducted from your account it would be <span>returned within 2-3 working days.</span>
                </p>
                <p>Please book your Ticket again <button><Link to='/'> Return Back </Link></button> </p>
            
        </div>
        <Footer/>
    </>
  )
}

export default PaymentFailed