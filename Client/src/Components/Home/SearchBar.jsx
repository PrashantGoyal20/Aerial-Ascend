import React, { useEffect, useState, useRef, useContext } from 'react'
import "./searchbar.css"
import { Link, useNavigate } from 'react-router-dom'
import SellIcon from '@mui/icons-material/Sell';
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import FlightIcon from '@mui/icons-material/Flight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EastIcon from '@mui/icons-material/East';
import { Context } from '../../main';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material';


const SearchBar = ({ position }) => {

    const [pannel, setPannel] = useState(0)
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState(position)
    const [pnr, setPnr] = useState()
    const [name, setName] = useState('')
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
            if (!pnr || !name) {
                pannel2Ref.current.classList.replace("error-search-hidden", "error-search-visible")
                setTimeout(() => pannel2Ref.current.classList.replace("error-search-visible", "error-search-hidden"), 2000)
                return;
            }
            let date
            
                navigate(`/passenger?pnr=${pnr}&name=${name}`)
            

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
                                <input placeholder='Enter PNR of your ticket' id='Departure-airport-search-1' value={pnr} onChange={(e) => { setPnr(e.target.value) }}></input>
                            </div>
                            <div className='searchbar-input-2'>
                               <label for='Departure-airport-search-1'>Enter Your Name</label>
                                <input placeholder='Enter your name on ticket' id='Departure-airport-search-1' value={name} onChange={(e) => { setName(e.target.value) }}></input>
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