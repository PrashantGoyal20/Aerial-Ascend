import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Footer/Loader'
import Header from '../Footer/Header'
import Footer from '../Footer/Footer'
import axios from 'axios'
import './mybooking.css'
import { useNavigate } from 'react-router-dom'
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { Context } from '../../main'

const MyBookings = () => {
    const server = import.meta.env.VITE_API_URL
    const [load, setLoad] = useState(true)
    const [bookings, setBookings] = useState([])
    const {isAuthorized}=useContext(Context)
    const navigate = useNavigate()
    useEffect(() => {
        if(!isAuthorized) navigate('/login')
        const findBookings = async () => {
            await axios.get(`${server}/passenger/getBookings`, { withCredentials: true }).then((res) => {
                setBookings(res.data.bookings)
                setLoad(false)
            })
        }
        findBookings()
    }, [])

    const handlenavigate = (pnr, name) => {
        navigate(`/passenger?pnr=${pnr}&name=${name}`)
    }
    return (
        <div>
            {load ? <Loader /> : <div>
                <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="85px" />
                {Object.keys(bookings).length!=0?<div className='mybooking'>
                    {bookings.map((booking, index) => {
                        return (
                            <div className='mybooking-container' onClick={(e) => handlenavigate(booking._id, booking.name)}>
                                <div className='mybooking-container-left'>
                                    {booking.name}
                                    <div>
                                        <span>{booking.origin}</span>
                                        <LocalAirportIcon style={{ rotate: "90deg" }} />
                                        <span>{booking.destination}</span>
                                    </div>
                                </div>
                                <div>
                                    {booking.status==='Confirmed'?<div className='mybooking-confirmed'>Confirmed</div>:<div className='mybooking-cancelled'>Cancelled</div>}
                                </div>
                                <div className='mybooking-container-right'>
                                  
                                       <span className='mybooking-flightNumber'> <img style={{ height: "20px", marginRight: "8px", marginTop: "15px", marginLeft: "8px" }} src='https://c.ekstatic.net/shared/icons/tailfin/ek.svg' /><span>{booking.flightNumber}</span></span>
                                         <span>{booking.seatType}</span>
                                    
                                </div>
                            </div>
                        )
                    })}
                </div>:<div className='mybooking'> No Bookings made yet!!!!</div>}
                
                <Footer />
            </div>}
        </div>
    )
}

export default MyBookings