import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Flights from './Flights'
import SearchBar from './SearchBar'
import Banner from './Banner'

const Home = () => {
    return (
        <div className='home-container'>
       
            <div className='home-card'>
                <picture>
                    <source media="(min-width: 1024px)" srcset="https://c.ekstatic.net/ecl/aircraft-interior/premium-economy/emirates-premium-economy-seat-w1920x480.jpg?h=_WrZVzOa_-M3hhiFNdXD7g" />
                    <source media="(max-width: 1023px) and (min-width: 480px)" srcset="https://c.ekstatic.net/ecl/aircraft-interior/premium-economy/emirates-premium-economy-seat-t1024x480.jpg?h=1ks-ywisej_kX41K77dCyA" />
                    <source media="(max-width: 479px)" srcset="https://c.ekstatic.net/ecl/aircraft-interior/premium-economy/emirates-premium-economy-seat-m480x480.jpg?h=zBCHG65ub3e5wvc7YZg46A" />
                    <img src='https://c.ekstatic.net/ecl/aircraft-interior/premium-economy/emirates-premium-economy-seat-w1920x480.jpg?h=_WrZVzOa_-M3hhiFNdXD7g' alt="" className='home-img' />
                </picture>
                
                

            </div>
            <div className='home-content'>
            <span className='premium'>
                Expereince the Luxury 
            </span>
            <span className='premium-continue'>
                <span>& </span>Comfort
            </span>
            <span className='fly-better'>
                    <img src='https://c.ekstatic.net/ecl/logos/emirates/emirates-fly-better-white.svg?h=ASXr1bEvRLq6igZoljExYw'/>
                </span>
            </div>
            <div className='flight-search'>
                <div className='search-head'>

                </div>
                <div className='search-bottom'>

                </div>
            </div>
            <div className='home-content'>
            <SearchBar/>
            

            </div>
            <Banner/>
        </div>
    )
}

export default Home