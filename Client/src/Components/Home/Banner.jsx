import React from 'react'
import "./banner.css"

const Banner = () => {
  return (
    <div className='banner-container'>
      <div className='banner-top'>
        <button className='France banner-top-button' placeholder="France" >FRANCE</button>
        <button className='US banner-top-button' placeholder='United States'>UNITED STATES</button>
        <button className='Japan banner-top-button' placeholder='Japan'>JAPAN</button>
        <button className='Austrailia banner-top-button' placeholder='Australia'>AUSTRAILIA</button>
      </div>

      <div className='banner-mid'>
        <span>Plan Your Trip with Us</span>
        <p>Save on your dream holidays and use your boarding pass to access exclusive offers.</p>

        <button>Learn More</button>
      </div>

      <div className='banner-bottom'>
        <span>About Us</span>
        <p>Learn more about our history, our business and sustainability initiatives</p>
        <div>
          <img src='https://c.ekstatic.net/ecl/about-us/family-planting-tree-w300x300.jpg?h=ar8-hQpf-unRHqmjJ_gsRA' alt='' />
          <img src='https://c.ekstatic.net/ecl/destinations/africa/south-africa/sunlight-baths-the-blyde-river-canyon-w300x300.jpg?h=Dy3u7WDNZeGj8figwrr98w' />
          <img src='https://c.ekstatic.net/ecl/emirates-staff/ground-staff/emirates-group-staff-group-photo-m300x300.jpg?h=uwsAa20y9RhQZSteKnIqmw' />
          <img src='https://c.ekstatic.net/ecl/agent-portal/a380-sky-view-w300x300.jpg?h=sBnzkrJJvKVp6g8XwpcDoA' alt='' />
        </div>
        <div>
          <span>Our Community</span>
          <span>Our Planet</span>
          <span>Our People</span>
          <span>Our Business</span>
        </div>
      </div>

    </div>
  )
}

export default Banner

