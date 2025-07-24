import React from 'react'
import Header from '../Footer/Header'
import Footer from '../Footer/Footer'
import SearchBar from './SearchBar'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import Loader from '../Footer/Loader'

const Search = () => {
    const server=import.meta.env.VITE_API_URL
    const query=useLocation()
    const [loading,setLoading]=useState(true)
    const [position,setPosition]=useState({})
    useEffect(()=>{
        const handleLocation=async()=>{
            const location = await axios.get(`${server}/flights/getallflights${query.search}`)
           
        setPosition(location.data.location)
        setLoading(false)
        }
        handleLocation()
    },[])
  return (
    <>{loading? <Loader/>:<div>
        <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1740937097/x2jgj7ypgocfggr8qyuv.png" height="140px"/>
        <div>
        {position && Object.keys(position) != 0 ? <picture>

                <source media="(min-width: 1024px)" srcset={position.locationPic} />
                <source media="(max-width: 1023px) and (min-width: 480px)" srcset={position.locationPic} />
                <source media="(max-width: 479px)" srcset={position.locationPic} />
                <img src={position.locationPic} alt="" className='home-img' style={{height:"460px"}}/>
            </picture> : <picture>

                <source media="(min-width: 1024px)" srcset="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" />
                <source media="(max-width: 1023px) and (min-width: 480px)" srcset="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" />
                <source media="(max-width: 479px)" srcset="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" />
                <img src="https://web-japan.org/kidsweb/explore/calendar/assets/img/july/summer-v01.jpg" alt="" className='home-img' style={{height:"460px"}}/>
            </picture>
            }

                {position && Object.keys(position) != 0 ? <div className='admin-flight-heading'>
                    <p className='heading-admin-flight'>Always Grateful for You</p>
                    <span className='heading-admin-flight'>Set Out on a wonderful journey to {position.location} </span>
                </div> : <div className='admin-flight-heading'>
                    <p className='heading-admin-flight'>Always Grateful for You</p>
                    <span className='heading-admin-flight'>Set Out on a wonderful journey with Us </span>
                </div>}
                <div style={{position:"relative",bottom:"220px",marginBottom:"-200px"}}>
            <SearchBar position={position.location}/>
            </div>
        </div>
        <Footer/>
    </div>}
    
    </>
  )
}

export default Search