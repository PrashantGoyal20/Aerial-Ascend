import React, { useEffect, useState, useRef } from 'react'
import "./searchbar.css"
import { Link, useNavigate } from 'react-router-dom'
import SellIcon from '@mui/icons-material/Sell';
import WatchLaterIcon from '@mui/icons-material/WatchLater'
import FlightIcon from '@mui/icons-material/Flight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EastIcon from '@mui/icons-material/East';

const SearchBar = () => {
    const [pannel, setPannel] = useState(0)
    const [origin, setOrigin] = useState("")
    const [destination, setDestination] = useState("")
    const pannel1Ref = useRef()
    const navigate=useNavigate()

    const handlePannel1 = () => {
        try {
          if (!origin || !destination) {
            pannel1Ref.current.classList.replace("error-search-hidden","error-search-visible")
            return;
        }
        navigate(`/flights?origin=${origin}&destination=${destination}`)   
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
                    <li>
                        <Link onClick={() => setPannel(2)}><WatchLaterIcon style={{ marginRight: "8px" }} />  Flight Status</Link>
                    </li>
                </ul>
            </div>
            <div className='search-conetnt'>
                {pannel == 0 ?
                    <div className='part1-container'>
                        <div >
                            <div className='searchbar-input'>
                                <label for='Departure-airport-search-0'>Departure from</label>
                                <input placeholder='Departure airport' id='Departure-airport-search-0' value={origin} onChange={(e) => { setOrigin(e.target.value) }}></input>
                            </div>

                            <div className='searchbar-input'>
                                <label for='Arrival-airport-search-0'>Arrival at</label>
                                <input placeholder='Arrival airport' id='Arrival-airport-search-0' value={destination} onChange={(e) => { setDestination(e.target.value) }}></input>
                            </div>

                            <button onClick={handlePannel1}> Continue <EastIcon /></button>
                        </div>
                        <p className='error-search-hidden' ref={pannel1Ref}> Please Enter All the Entries </p>
                    </div> :
                    pannel == 1 ? <div>
                        1
                    </div> :
                        <div>2</div>
                }
            </div>
        </div>
    )
}

export default SearchBar