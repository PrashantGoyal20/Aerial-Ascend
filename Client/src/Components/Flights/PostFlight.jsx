import React, { useEffect, useState ,useContext} from 'react'
import "./postflight.css"
import Map from './Map';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MobileTimePicker } from '@mui/x-date-pickers';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import dayjs from 'dayjs';
import { colors } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import Footer from '../Footer/Footer';
import Header from '../Footer/Header';

const PostFlight = () => {
    const server=import.meta.env.VITE_API_URL
    const{setIsAuthorized,isAuthorized,user}=useContext(Context)

    const [flightNumber, setFlightNumber] = useState("");
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const [departureTime, setDepartureTime] = useState(null)
    const [departureDate, setDepartureDate] = useState(null)
    const [arrivalTime, setArrivalTime] = useState(null)
    const [arrivalDate, setArrivalDate] = useState(null)
    const [arrivalDateTime, setArrivalDateTime] = useState('')
    const [departureDateTime, setDepartureDateTime] = useState('')
    const [duration, setDuration] = useState('')
    const [price, setPrice] = useState([])
    const [originCoordinates, setOriginalCoordinates] = useState([])
    const [destinationCoordinates, setDestinationCoordinates] = useState([])
    const [seatType, setSeatType] = useState([])
    const [seatsAvailable, setSeatAvailable] = useState([])

    const [heading1, setHeading1] = useState(null)
    const [loading, setLoading] = useState(true)
    const [originCoordX, setOriginCoordX] = useState('');
    const [originCoordY, setOriginCoordY] = useState('');
    const [destCoordX, setDestCoordX] = useState('');
    const [destCoordY, setDestCoordY] = useState('');
    const [map, setMap] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthorized){
             navigate('/login')
        }
        setTimeout(() => {
            setHeading1({ h1: "Start a New Journey", h2: "@Please add each entry carefully because no further changes cna be made once flight details are posted" })
            setLoading(false)
        }, 600)
    }, [])

    const [pairs, setPairs] = useState([{ val1: '', val2: '', val3: '' }]);

    const handleShowMap = () => {

    try {
        if (!isNaN(originCoordY) && !isNaN(originCoordX) && !isNaN(destCoordY) && !isNaN(destCoordX) && origin && destination) {
            setOriginalCoordinates([parseFloat(originCoordX), parseFloat(originCoordY)])
            setDestinationCoordinates([parseFloat(destCoordX), parseFloat(destCoordY)])
            setMap(true);
        } else if(isNaN(originCoordY) || isNaN(originCoordX) || isNaN(destCoordY) || isNaN(destCoordX)){
            alert('Please enter valid numeric coordinates.');
            setMap(false)
            return
        }  
    } catch (error) {
        console.log(error)
    }
      
    };

    const handleChange = (index, field, value) => {
        const updatedPairs = [...pairs];
        updatedPairs[index][field] = value;
        setPairs(updatedPairs);
    };

    const deletePair = () => {
        setPairs(prev => prev.slice(0, -1))
    }

    const addPair = () => {
        setPairs([...pairs, { val1: '', val2: '', val3: '' }]);
    }


    const preprocessingData = async () => {
        try {
            const start = dayjs(departureDate)
                .hour(dayjs(departureTime).hour())
                .minute(dayjs(departureTime).minute());

            const end = dayjs(arrivalDate)
                .hour(dayjs(arrivalTime).hour())
                .minute(dayjs(arrivalTime).minute());

            const diffMs = end.diff(start);
            const diffMinutes = Math.floor(diffMs / 60000);
            const hours = Math.floor(diffMinutes / 60);
            const minutes = diffMinutes % 60;
            const durationStr = `${hours} hours ${minutes} minutes`;
            const departformat = start.format('HH:mm MMMM,DD,YYYY,dddd')
            // setDepartureDateTime(departformat)
            const arrivalformat = end.format('HH:mm MMMM,DD,YYYY,dddd')
            // setArrivalDateTime(arrivalformat)
            // setDuration(durationStr);
            const seatT=pairs.map((seat) => seat.val1)
            const seatP=pairs.map((price) => price.val2)
            const seatA=pairs.map(seats => seats.val3)

            let originCoord=[]
            let destCoord=[]
            if (!isNaN(originCoordY) && !isNaN(originCoordX) && !isNaN(destCoordY) && !isNaN(destCoordX) ) {

                originCoord=[parseFloat(originCoordX), parseFloat(originCoordY)]
                destCoord=[parseFloat(destCoordX), parseFloat(destCoordY)]
            } else {
                alert('Please enter valid numeric coordinates.');
            }

            return { flightNumber:flightNumber,
                     origin,
                     destination,
                     departureTime:departformat,
                     arrivalTime:arrivalformat,
                     duration:durationStr,
                     price: seatP,
                     originCoordinates:originCoord,
                     destinationCoordinates: destCoord,
                     seatType:seatT, 
                     seatsAvailable:seatA 
                    }


        } catch (error) {
            console.log(error)
        }
    }

    const handleData = async (e) => {
        e.preventDefault();
        try {
            const data = await preprocessingData()
            // console.log(data)
            await handleSubmit(data)
        } catch (error) {
            console.log(error)
        }

    }

    const handleSubmit = async (data) => {

        try {
            
            console.log(data)
            // console.log({ flightNumber, origin, destination, departureDateTime, arrivalDateTime, duration, price, originCoordinates, destinationCoordinates, seatType, seatsAvailable })
            const response = await axios.post(`${server}/postFlight`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            })

            toast.success(response.data.message)
            navigate(`/flights?destination=${data.destination}&origin=${data.origin}`)

        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
        <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="85px"/>
        <div className='post-flight-container'>
            {!loading ? <div className='post-flight-heading' style={{}}><span>{heading1.h1}</span>
                <p>{heading1.h2}</p>
            </div> : <><div style={{ height: "125px" }}></div></>}
            <form onSubmit={handleData}>
                <div className='coord'>
                    <label >Flight Number</label>
                    <input type='text' name='flight_number' value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} placeholder='Mention Flight Number' />
                </div>
                <div className='coord'>
                    <label >Boarding Location</label>
                    <input type='text' value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder='Mention Flight take off location' />
                </div>
                <div className='coord'>
                    <label >Your Destination</label>
                    <input type='text' value={destination} onChange={(e) => setDestination(e.target.value)} placeholder='Mention Flight landing location' />
                </div>
                <div></div>
                <DatePicker sx={{ background: "white" }} label="Choose date of Departure" value={departureDate} onChange={(value) => setDepartureDate(value)} />
                <MobileTimePicker sx={{ background: "white" }} label="Choose time of Departure" defaultValue={dayjs('2022-04-17T15:30')} value={departureTime} onChange={(value) => setDepartureTime(dayjs(value))} />
                <DatePicker sx={{ background: "white" }} label="Choose date of Arrival" value={arrivalDate} onChange={(value) => setArrivalDate(value)} />
                <MobileTimePicker sx={{ background: "white" }} label="Choose time of Arrival" defaultValue={dayjs('2022-04-17T15:30')} value={arrivalTime} onChange={(value) => setArrivalTime(dayjs(value))} />
                <div className='post-flight-seats'>
                    {pairs.map((pair, index) => (
                        <div className='seat-choosers' >
                            <select value={pairs.val1} onChange={(e) => handleChange(index, 'val1', e.target.value)}>
                            <option>None</option>
                                <option>Economy</option>
                                <option>Premium Economy</option>
                                <option>Business</option>
                                <option>First</option>
                            </select>
                            <div className='coord'>
                                <label >Price for Ticket </label>
                                <input
                                    type="number"
                                    name='price'
                                    placeholder="Price per ticket in INR"
                                    value={pair.val2}
                                    onChange={(e) => handleChange(index, 'val2', e.target.value)}
                                    required
                                /></div>
                            <div className='coord'>
                                <label >Seats Offered Under this Class</label>
                                <input
                                    type="number"
                                    name='total_seats'
                                    placeholder="Seats Offered for this Seat Class"
                                    value={pair.val3}
                                    onChange={(e) => handleChange(index, 'val3', e.target.value)}
                                    required
                                /></div>
                        </div>
                    ))}
                    <button type="button" onClick={addPair}><AddCircleIcon style={{ color: "blue" }} /></button>
                    <button type='button' onClick={deletePair}><CancelIcon style={{ color: "red" }} /></button>
                </div>
                <div style={{ height: "0px", width: "0px" }}></div>
                <div className='coord'>
                    <label >Boarding Airport Latitude</label>
                    <input
                        type="text"
                        value={originCoordX}
                        name='origin-lat'
                        onChange={(e) => setOriginCoordX(e.target.value)}
                        placeholder="Set Boarding Airport Latitude (e.g. 17.2403)"
                    /></div>
                <div className='coord'>
                    <label>Boarding Airport Longitude</label>
                    <input
                        type="text"
                        value={originCoordY}
                        name='origin-lng'
                        onChange={(e) => setOriginCoordY(e.target.value)}
                        placeholder="Set Boarding Airport Longitude (e.g. 78.4294)"
                    /></div>

                <div className='coord'>
                    <label>Destiantion Airport Latitude</label>
                    <input
                        type="text"
                        value={destCoordX}
                        name='dest-lat'
                        onChange={(e) => setDestCoordX(e.target.value)}
                        placeholder="Set Destination Airport Latitude (e.g. 17.2403)"
                    /></div>
                <div className='coord'>
                    <label>Destiantion Airport Latitude</label>
                    <input
                        type="text"
                        value={destCoordY}
                        name='dest-lng'
                        onChange={(e) => setDestCoordY(e.target.value)}
                        placeholder="Set Destiantion Airport Longitude (e.g. 78.4294)"
                    /></div>
                <div className='post-flight-button'>
                    <button type='button' className='post-flight-map-btn' onClick={handleShowMap}> Mark on Map <GpsFixedIcon style={{ marginLeft: "5px" }} /></button>


                    <button className='post-flight-submit-btn' type='submit'>Submit <EastIcon style={{ marginLeft: "10px" }} /></button>
                </div>

            </form>

            {map ? <div className='map-container'> <Map point1={originCoordinates} point2={destinationCoordinates} origin={origin} dest={destination} /></div> : <></>}



        </div>
        <Footer/>
        </>
    )
}

export default PostFlight