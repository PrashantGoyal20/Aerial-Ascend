import React from 'react'
import "./footer.css"
import { Link, Links } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='footer-container'>

            <div className='footer-head'>
                <div><p>About Us</p>
                    <Link to='/'>About Us</Link>
                    <Link to='/'>Careers</Link>
                    <Link to='/'>Media Centre</Link>
                    <Link to='/'>Our Planet</Link>
                    <Link to='/'>Our People</Link>
                    <Link to='/'>Our Community</Link>

                </div>
                <div><p>Help</p>
                    <Link to='/'>Help and Contact</Link>
                    <Link to='/'>Travel Updates</Link>
                    <Link to='/'>Special Assistance</Link>
                    <Link to='/'>Frequently asked questions</Link>

                </div>
                <div><p>Book</p>
                    <Link to='/'>Book flights</Link>
                    <Link to='/'>Travel services</Link>
                    <Link to='/'>Transportation</Link>
                    <Link to='/'>Planning your trip</Link>
                    <Link to='/'>Dubai Experience</Link>

                </div>
                <div><p>Manage</p>
                    <Link to='/'>Check-In</Link>
                    <Link to='/'>Manage Your Booking</Link>
                    <Link to='/'>Chauffeur-drive service</Link>
                    <Link to='/'>Flight status</Link>

                </div>
            </div>
            <div className='footer-mid'>
                <div><p>Subscribe to our special offers</p>
                    <div>
                        Save with our latest fares and offers.
                    </div>
                    <Link to='/'>Unsubscribe or change your preferences</Link>

                </div>
                <div><p>Aerial Ascend App</p>
                    <div>Book and manage your flights on the go.</div>
                    <div className='google-play'>
                        <img src='./App-Store.jpg' />
                        <img src='./Google-Play.jpg' />
                    </div>

                </div>

            </div>
            <div className='footer-bottom'>
                All these links in footer are just for show, they actually don't work

            </div>
        </footer>
    )
}

export default Footer