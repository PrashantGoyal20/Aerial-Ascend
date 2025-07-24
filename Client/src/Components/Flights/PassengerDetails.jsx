import React, { useEffect, useState } from 'react'
import Header from '../Footer/Header'
import axios from 'axios'
import { Link, useLocation, useParams } from 'react-router-dom'
import './paymentSuccess.css'
import Loader from '../Footer/Loader'
import Footer from '../Footer/Footer'

const PassengerDetails = () => {
    const server=import.meta.env.VITE_API_URL
    const [passenger,setPassenger]=useState({})
    const [load,setLoad]=useState(true)
    const [flight,setFlight]=useState({})
    const [msg,setMsg]=useState({})
   const location=useLocation()
   
    const src=`https://api.qrserver.com/v1/create-qr-code/?data=${passenger?._id}&size=100x100`


    useEffect(()=>{
        const handleInfo=async()=>{
            await axios.get(`${server}/passenger/search-passeneger${location.search}`).then(
                (res)=>{
                    console.log(res.data)
                    setPassenger(res.data?.passenger)
                    setFlight(res.data?.flight)
                    setMsg(res.data?.message)
                    setLoad(false)

                }
            )
        }
        handleInfo()
        
    },[])

  return (
    <>
    {load ? <><Loader/></>:<>
    <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1740937097/x2jgj7ypgocfggr8qyuv.png" height="140px"/>
    {passenger && passenger?._id?<div>
    
        <div class="ticket-container">
        <div class="watermark">
            <img src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" />
        </div>
        <div class="info">
            <div class="airline-header">
                <h1>Aerial Ascend Airlines</h1>
                <p><strong>Boarding Pass</strong></p>
            </div>

            <div class="info-row"><strong>Name:</strong> <span>{passenger.name}</span></div>
            <div class="info-row"><strong>PNR:</strong> <span>{passenger._id}</span></div>
            <div class="info-row"><strong>Email:</strong> <span>{passenger.email}</span></div>
            <div class="info-row"><strong>Phone:</strong> <span>{passenger.phone}</span></div>
            <div class="info-row"><strong>Age:</strong> <span>{passenger.age}</span></div>
            <div class="info-row"><strong>Address:</strong> <span>{passenger.address}</span></div>
            <div class="info-row"><strong>Flight Number:</strong> <span>{passenger.flightNumber}</span></div>
            <div class="info-row"><strong>Seat Type:</strong> <span>{passenger.seatType}</span></div>
            <div class="info-row"><strong>Origin:</strong> <span>{passenger.origin}</span></div>
            <div class="info-row"><strong>Destination:</strong> <span>{passenger.destination}</span></div>
            <div class="info-row"><strong>Departure:</strong> <span>{flight.departureTime}</span></div>
            <div class="info-row"><strong>Flight Duration:</strong> <span>{flight.duration}</span></div>
            <div class="info-row"><strong>Arrival:</strong> <span>{flight.arrivalTime}</span></div>
            <div class="info-row"><strong>Price:</strong> <span>₹{passenger.price}</span></div>

            <div class="barcode">
                <img src={src} />
                <p>Scan for Check-In</p>
            </div>

            <div class="footer">
                This ticket is valid only for the person named above. Please carry a valid ID proof.<br />
                Boarding closes 45 minutes before departure.
            </div>
        </div>
    </div>

    </div>:<div style={{
        background:"white",
        padding:"150px",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    }}>
    <p>{msg}</p>

        <Link style={{textDecoration:"none", background:"blue",color:"white",padding:"20px", marginTop:"30px"}} to='/'>Back to Homepage</Link>
    </div>}
    

    </>}
    <Footer/>
    </>
    
  )
}

export default PassengerDetails