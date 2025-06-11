import React, { useContext, useEffect, useState } from 'react'
import "./flightdetails.css"
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-hot-toast"
import { Context } from '../../main'
import Map from './Map'
import Divider from '@mui/material/Divider';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';


export const FlightDetails = () => {

  const { id } = useParams()
  const [flightDetails, setFlightDetails] = useState({})
  const { user } = useContext(Context)
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(`http://localhost:8000/flights/flightDetails/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setFlightDetails(res.data.flight);
        console.log(flightDetails)
      })
      .catch((error) => {
        navigate("/notfound");
        console.log(error);
      });
  }, [])

  const bookTicket = () => {
    navigate(`/bookTicket/${flightDetails._id}`)
  }
  return (
    <div className='flight-detail-card'>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {user && flightDetails ? <>

          <div className='flight-card'>
            <div className='flight-detail-card-top'>
              <div className='flight-detail-card-top-left'>
                <div className='flight-detail-card-top-left-above'>
                  <span>{flightDetails.origin}</span>
                  <LocalAirportIcon style={{ rotate: "90deg", fontSize: "15px" }} />
                  <span>{flightDetails.destination}</span>
                </div>
                <div className='flight-detail-card-top-left-below'>
                  <span> 1 way</span>|<span> 1 passenger</span>
                </div>
              </div>
              <div className='flight-detail-card-top-right'>
                <div className='flight-detail-card-top-right-above'>
                  <span style={{ marginRight: "6px" }}>INR</span> {flightDetails.price}</div>
                <div className='flight-detail-card-top-right-below'>
                  Inclusive of airfare, taxes, fees and carrier imposed charges
                </div>  


              </div>

            </div>
            <div className='flight-detail-card-mid'>
            <div className='flight-detail-card-mid-top'>
              <span>Choosing your outbound flight</span>
              <span> Review Your Flight</span>
              </div>
            </div>
            <div>

            </div>
          </div>
          <button onClick={bookTicket} className='book'> Book Ticket</button>
        </> : <>Please Sign in</>}
      </div>
      <div style={{ width: "100vw", height: "300px", marginBottom: "80px" }}>
        <Map /></div>


    </div>
  )
}
