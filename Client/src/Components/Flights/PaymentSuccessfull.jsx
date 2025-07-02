import React, { useEffect, useState } from 'react'
import Header from '../Footer/Header'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './paymentSuccess.css'
import Loader from '../Footer/Loader'

const PaymentSuccessfull = () => {
    const [passenger,setPassenger]=useState({})
    const [flight,setFlight]=useState({})
    const [load,setLoad]=useState(true)
    const param=useParams()
    const id=param.id

    useEffect(()=>{
        const handleData=async()=>{
            const res=await axios.get(`http://localhost:8000/passenger/passengerInfo/${id}`)
            setFlight(res.data.flight)
            setPassenger(res.data.passenger)
            setLoad(false)
        }
        handleData()
    },[])

    const src=`https://api.qrserver.com/v1/create-qr-code/?data=${passenger._id}&size=100x100`

    const handleTicket=async()=>{
        const res=await axios.get(`http://localhost:8000/passenger/success/${id}`,{
            responseType:'blob'
        })
        const blob = new Blob([res.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'flight_ticket.pdf';
        link.click();
    }
  return (
    <>
    {load ? <><Loader/></>:<>
    <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1740937097/x2jgj7ypgocfggr8qyuv.png" height="140px"/>
    <div>
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

    <button onClick={handleTicket}> Download</button>
    </div>

    </>}
    </>
    
  )
}

export default PaymentSuccessfull