import React, { useEffect, useState, useRef, useContext } from 'react'
import "./flights.css"
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import axios from 'axios';
import EastIcon from '@mui/icons-material/East';
import { Link, useLocation } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import { fontSize } from '@mui/system';
import Loader from '../Footer/Loader';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import Footer from '../Footer/Footer';
import Header from '../Footer/Header';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Flights = () => {
    const server=import.meta.env.VITE_API_URL
    const [flights, setFlights] = useState([]);
    const [position, setPosition] = useState([]);
    const [load, setLoad] = useState(true)
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const expander = useRef()
    const [cancel, setCancel] = useState(null)
    const cancelbtn = useRef()
    const surbtn = useRef()

    const navigate = useNavigate()
    const { setIsAuthorized, isAuthorized, user } = useContext(Context)

    useEffect(() => {
        const fetchFlights = async () => {
            await axios.get(`${server}/flights/getallflights${location.search}`)
                .then((flight) => {
                    setFlights(flight.data.flights)
                    setPosition(flight.data.location)
                    setLoad(false)
                })


        };
        fetchFlights();
    }, [flights])

    const [expandedFlightId, setExpandedFlightId] = useState(null);

    const toggleCancel = (id) => {
        setCancel(prevId => prevId === id ? null : id)
    }

    const handleCancel = async (e, id) => {
        e.preventDefault()
        try {
            await axios.get(`${server}/flights/update-flight/${id}`)
                .then(
                    toggleCancel(id)
                )
        } catch (error) {

        }
    }

    const toggleExpand = (id) => {
        setExpandedFlightId(prevId => prevId === id ? null : id);
    };

    const handleBooking = (value, id) => {
        if (!isAuthorized) {
            navigate('/login')
        }
        else {
            navigate(`/bookTicket/${id}?seatType=${value}`)
        }
    }


    return (
        <>

            <div className='adminFlight-container'>
                {load ? <><Loader /></> : <>
                    <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="85px" />
                    {position && Object.keys(position) != 0 ? <picture>

                        <source media="(min-width: 1024px)" srcset={position.locationPic} />
                        <source media="(max-width: 1023px) and (min-width: 480px)" srcset={position.locationPic} />
                        <source media="(max-width: 479px)" srcset={position.locationPic} />
                        <img src={position.locationPic} alt="" className='home-img' />
                    </picture> : <picture>

                        <source media="(min-width: 1024px)" srcset="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" />
                        <source media="(max-width: 1023px) and (min-width: 480px)" srcset="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" />
                        <source media="(max-width: 479px)" srcset="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" />
                        <img src="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" alt="" className='home-img' />
                    </picture>
                    }

                    {position && Object.keys(position) != 0 ? <div className='admin-flight-heading'>
                        <p className='heading-admin-flight'>Always Grateful for You</p>
                        <span className='heading-admin-flight'>Set Out on a wonderful journey to {position.location} </span>
                    </div> : <div className='admin-flight-heading'>
                        <p className='heading-admin-flight'>Always Grateful for You</p>
                        <span className='heading-admin-flight'>Set Out on a wonderful journey with Us </span>
                    </div>}


                    {Object.keys(flights).length != 0 ? <div className='flight-admin'>

                        {flights.map((element) => {
                            const [depTime, depDate] = element.departureTime.split(' ')
                            const [depmonth, depday, depyear, depweekday] = depDate.split(",")
                            const [arrivalTime, arrivalDate] = element.arrivalTime.split(' ')
                            const [month, day, year, weekday] = arrivalDate.split(",")

                            return (
                                <div className='flight-card'>
                                    <div className='flight-card-top' style={{ border: "transparent", justifyContent: "flex-start" }}>
                                        <img style={{ height: "20px", marginRight: "8px", marginTop: "15px", marginLeft: "8px" }} src='https://c.ekstatic.net/shared/icons/tailfin/ek.svg' />
                                        <p>{element.flightNumber}</p>
                                    </div>
                                    <div className='flight-card-mid'>
                                        <div className='flight-card-mid-left'>
                                            <div className='flight-card-dep'>
                                                <span style={{ fontSize: "20px" }}>{element.origin}</span>
                                                <span style={{ fontSize: "30px" }}>{depTime}</span>
                                                <p> <span>{depweekday}</span> <span>{depday}</span> <span>{depmonth}</span></p>

                                            </div>
                                            <div className='flight-card-duration'>
                                                <LocalAirportIcon style={{ rotate: "90deg" }} />
                                                <span>{element.duration}</span>

                                            </div>
                                            <div className='flight-card-arrival'>
                                                <span style={{ fontSize: "20px" }}>{element.destination}</span>
                                                <span style={{ fontSize: "35px" }}>{arrivalTime}</span>
                                                <p> <span>{weekday}</span> <span>{day}</span> <span>{month}</span></p>


                                            </div>
                                        </div>
                                        <div className='flight-card-mid-right'>
                                            {(element.status === 'Cancelled') ?
                                                <>
                                                    <div style={{ borderRadius: "10px", border: "transparent", color: "white", backgroundImage: "linear-gradient(red,pink)", padding: "10px" }}>Cancelled</div>
                                                </>
                                                :
                                                <>
                                                    {isAuthorized && user?.role === 'admin' && <> {cancel === element._id ? <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                                                        <button style={{ marginRight: "10px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", border: "transparent", color: "white", background: "red", cursor: "pointer", padding: "10px" }} onClick={(e) => handleCancel(e, element._id)}><CheckIcon style={{ color: "white" }} /> Yes Cancel</button>
                                                        <button style={{ display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "10px", border: "transparent", color: "white", background: "green", cursor: "pointer", padding: "10px" }} onClick={(e) => toggleCancel(element._id)}><CloseIcon style={{ color: "white" }} /> Don'tCancel</button>
                                                    </div>
                                                        :
                                                        <button onClick={(e) => toggleCancel(element._id)} style={{ borderRadius: "10px", border: "transparent", color: "white", background: "red", cursor: "pointer", padding: "10px" }}>Cancel Flight</button>
                                                    }</>}
                                                    <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", cursor: "pointer" }} onClick={() => toggleExpand(element._id)}>
                                                        {element.seatType[0]} {expandedFlightId === element._id ? <KeyboardArrowRightIcon style={{ rotate: "-90deg", color: "red", transition: "ease-out 0.5s" }} /> : <KeyboardArrowRightIcon style={{ rotate: "90deg", color: "red", transition: "ease-out 0.5s" }} />}
                                                    </div>
                                                    <div> from INR   <span style={{ fontSize: "30px" }}>{element.price[0]}</span></div>
                                                </>
                                            }

                                        </div>

                                    </div>
                                    {element.status != 'Cancelled' && expandedFlightId === element._id ? (
                                        <div className='flight-card-bottom' style={{ marginBottom: "20px" }}>
                                            {element.seatType.map((seat, index) => {
                                                return (
                                                    <div className='flight-card-seat'>
                                                        <p>{seat}</p>
                                                        <span>INR <span>{element.price[index]}</span></span>
                                                        {element.seatsAvailable[index]>=0?<button onClick={(e) => handleBooking(seat, element._id)}><span>{element.seatsAvailable[index]}</span></button>:<>No Ticket</>}
                                                    </div>
                                                )
                                            })}
                                        </div>) : <div style={{ transition: "ease-in 1s", opacity: "0.4" }}></div>}

                                </div>
                            )
                        })}

                        <div className='admin-flight-offer'>
                            <h1 style={{ fontSize: "25px", fontStyle: "italic", justifyContent: "center" }}>ICICI OFFERS <img style={{ height: "30px" }} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAnFBMVEVHcEz//////////////fv////////+/Pr77+XRopmxZV6lRDepVEzJmZT68/L//v3///69dWeXKR2SEQGcMymUIxuVHg+8fnj37+7////VgVLp0MzNlo3olV3cu7jJj4b///+wPQn////2sXvDVRnu3t3zzrfmdRbLm5fzl0r4xqLxfQr5x6LuijrxgBrWZhj4wJf////0p2z2s4LKggxgAAAANHRSTlMAAwgQGSI6Z3+9+v7505JYMNv//////////+P/i9r/jir/Rb3//4H//+Cb/6rx////0/8pUn9EpwAAAVRJREFUeAFioA5gZASURh9ZDsJAEEDHSsQxWNCy2zknwPH+dxs1j7ydWtZXFuNcUDgbDYhL5bieHwTh7ziSPWM8jtyJTlJfgwnHqmdCOV5gzHSGU6PNJBrYxJY+IqFOnc5+Qrlz2yULxIWmLFvjyl0ZbXE9W6dAuGmMbZ3VzjbGpEFC1kEm94ej7ZJwgadUlzl3Fr1oDeaKNimQBVEzMbodAdIF2Skhg/m+Qq7umYb0hJRribtcVSii2wXM9GqmiLMACAtHVijPjydoMMavVoVnvucVxofsSONpJq0Kx5uzZRWq26PE5IoYgrXMVXxUY/F4lki3BDg+8r1gBJT94/GwBsEMF0Y/s0Mk279WFp8aaMv17mJty61ViW9WL8fdGvGVdY0i79mDgoiL4r7vGT2C1exl8e3uO/tR2DY6PLKPpfE+FpXJUa2Mi2+8FZxVQt3Pf/IHeuImVV64VW8AAAAASUVORK5CYII=" /></h1>
                            <p>Book your travel now with our exclusive code and pay using your Aerial Skywards ICICI card to save on flights. <a>Change your search</a> and add the promotional code INICI24 to apply your savings. Offer valid until 31 July 2025. Terms and conditions apply.</p>
                        </div>
                    </div>
                        :
                        <div className='No-flight'>
                            <span>Sorry For The Inconvenience</span>
                            <p>No current flights available for the moment for your destination</p>
                        </div>
                    }
                    <Footer />
                </>}


            </div>

        </>
    )
}

export default Flights