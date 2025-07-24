import React, { useEffect, useState, useRef, useContext } from 'react'
import "./searchbar.css"
import { Link, useNavigate } from 'react-router-dom'
import SellIcon from '@mui/icons-material/Sell';
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import FlightIcon from '@mui/icons-material/Flight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EastIcon from '@mui/icons-material/East';
import { Context } from '../../main';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';


// const CustomInput = styled(TextField)(({ theme }) => ({
//     '& .MuiInputBase-root': {
//         border: 'none',
//         borderRadius: 0,
//         backgroundColor: 'transparent',
//         padding: '4px 0',
//         height:"40px"
//     },
//     '& .MuiInputBase-input': {
//         border: 'none',
//         outline: 'none',
//         padding: '6px 0',
//         fontSize: 16,
//         borderBottom: 'none',
//     },
//     '& .MuiInputBase-input:hover':{
//         border:"none"
//     },
//     '& .MuiInput-underline:before': {
//         borderBottom: 'none',
//     },
//     '& .MuiInput-underline:before:hover': {
//         borderBottom: 'none',
//     },
//     '& .MuiInput-underline:after': {
//         borderBottom: 'none',
//     },
//     '& .MuiInputLabel-root': {
//         display: 'none',
//     },
//     '& .MuiSvgIcon-root': {
//         backgroundColor: 'white',
//         borderRadius: '50%',
//         padding: '4px',
//     },
//     '& .css-1ysp02-MuiButtonBase-root-MuiIconButton-root':{
//         width:"60px"
//     }
// }));


const SearchBar = ({ position }) => {

    const [pannel, setPannel] = useState(0)
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState(position)
    const [pnr, setPnr] = useState()
    const [departuredate, setDeparturedate] = useState(null)
    const [arrivaldate, setArrivaldate] = useState(null)
    const [selection, setSelection] = useState("departure")
    const pannel1Ref = useRef()
    const pannel2Ref = useRef()
    const navigate = useNavigate()
    const { isAuthorized, setIsAuthorized } = useContext(Context)


    const handlePannel1 = () => {
        try {
            if(!isAuthorized) navigate('/login')
            if (!origin || !destination) {
                pannel1Ref.current.classList.replace("error-search-hidden", "error-search-visible")
                setTimeout(() => pannel1Ref.current.classList.replace("error-search-visible", "error-search-hidden"), 2000)
                return;
            }
            navigate(`/flights?origin=${origin}&destination=${destination}`)
        } catch (error) {
            console.log(error)
        }

    }

    const handlePannel2 = () => {
        try {
            if(!isAuthorized) navigate('/login')
            if (!pnr || (!departuredate && !arrivaldate)) {
                pannel2Ref.current.classList.replace("error-search-hidden", "error-search-visible")
                setTimeout(() => pannel2Ref.current.classList.replace("error-search-visible", "error-search-hidden"), 2000)
                return;
            }
            let date
            if (departuredate) {
                date = dayjs(departuredate).format('MMMM,DD,YYYY,dddd')
                navigate(`/passenger?pnr=${pnr}&departureTime=${date}`)
            }
            else {
                date = dayjs(arrivaldate).format('MMMM,DD,YYYY,dddd')
                navigate(`/flights?pnr=${pnr}&arrivalTime=${date}`)
            }
            

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='searchbar'>
            <div className='search-top'>
                <ul>
                    <li>
                        <Link onClick={() => setPannel(0)}><FlightIcon style={{ marginRight: "8px" }} />  Search flights</Link>
                    </li>
                    <li>
                        <Link onClick={() => setPannel(1)}><SellIcon style={{ marginRight: "8px" }} />  Manage Booking</Link>
                    </li>
                </ul>
            </div>
            <div className='search-conetnt'>
                {pannel == 0 ?
                    <div className='part1-container'>
                        <div >
                            <div className='searchbar-input'>
                                <label for='Departure-airport-search-0'>Departure from</label>
                                <input placeholder='Departure Airport' id='Departure-airport-search-0' value={origin} onChange={(e) => { setOrigin(e.target.value) }}></input>
                            </div>

                            <div className='searchbar-input'>
                                <label for='Arrival-airport-search-0'>Arrival at</label>
                                <input placeholder='Arrival Airport' id='Arrival-airport-search-0' value={destination} onChange={(e) => { setDestination(e.target.value) }}></input>
                            </div>

                            <button onClick={handlePannel1}> Continue <EastIcon /></button>
                        </div>
                        <p className='error-search-hidden' ref={pannel1Ref}> Please Enter All the Entries </p>
                    </div> :
                    <div className='part2-container'>
                        <div >
                            <div className='searchbar-input'>
                                <label for='Departure-airport-search-1'>Enter Your PNR</label>
                                <input placeholder='Departure Airport' id='Departure-airport-search-1' value={pnr} onChange={(e) => { setPnr(e.target.value) }}></input>
                            </div>
                            <div className='searchbar-input-2'>
                                <div style={{ position: "relative", top: "12px", paddingBottom: "10px" }}>
                                    <label for='departure'> Departure Date</label>
                                    <input type="radio"
                                        value="departure"
                                        checked={selection === 'departure'}
                                        name='date'
                                        onChange={(e) => setSelection(e.target.value)}
                                    />
                                    <label for='arrival' style={{ marginLeft: "25px" }}> Arrival Date</label>
                                    <input type="radio"
                                        value="arrival"
                                        checked={selection === 'arrival'}
                                        name='date'
                                        onChange={(e) => setSelection(e.target.value)} />

                                </div>
                                <div>
                                    {selection === 'arrival' ? <>
                                        <DatePicker sx={{ background: "white" }} label="Choose date of Arrival" value={arrivaldate} onChange={(value) => setArrivaldate(value)} />
                                    </> : <>
                                        <DatePicker sx={{ background: "white" }} label="Choose date of Departure" value={departuredate} onChange={(value) => setDeparturedate(value)} />
                                    </>}
                                </div>
                            </div>
                            <button onClick={handlePannel2} className='pannel-2-btn' style={{ backgroundColor: "#bcbc06", cursor: "pointer" }}> Continue <EastIcon /></button>
                        </div>
                        <p className='error-search-hidden' ref={pannel2Ref}> Please Enter All the Entries </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchBar