import React, { useState, useContext, useEffect } from 'react'
import { Context } from '../../main'
import { useLocation, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './bookticket.css'
import Loader from '../Footer/Loader'
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import Footer from '../Footer/Footer'
import Header from '../Footer/Header'
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const BookTicket = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState("")
  const [age, setAge] = useState()
  const [seats, setSeats] = useState()
  const [load, setLoad] = useState(true)
  const [order, setOrder] = useState({})
  const [active,setActive]=useState(false)

  const { setIsAuthorized, isAuthorized, user } = useContext(Context)
  const navigate = useNavigate()
  const param = useParams()
  const [index, setIndex] = useState()
  const [flight, setFlight] = useState({})
  const location = useLocation()
  const id = param.id

  useEffect(() => {
    // if (!isAuthorized) {
    //   navigate('/login')
    // }
    const handleInitial = async () => {

      await axios.get(`http://localhost:8000/flights/flightDetails/${id}${location.search}`,
        { withCredentials: true }).then((res) => {

          setFlight(res.data.ans)
          setIndex(res.data.index)
          setLoad(false)
        }
        )
    }
    handleInitial();

  }, [id])

  // var [depTime, depDate]=[]
  // let [depmonth, depday, depyear, depweekday]=[]
  // let [arrivalTime, arrivalDate]=[]
  // let [month, day, year, weekday]=[]
  //   if(!load){
  // [depTime, depDate] = flight.departureTime.split(' ')
  //  [depmonth, depday, depyear, depweekday] = flight.departureTime.split(" ")[1].split(",")
  //  [arrivalTime, arrivalDate] =flight.arrivalTime.split(" ")
  // [month, day, year, weekday] = flight.arrivalTime.split(" ")[1].split(",")
  //   }

  const handleActive=()=>{
    setActive(!active)
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      if(!active) return;
      if (!name || !email || !age || !address || !phone) {
        
      }

      const { data: order } = await axios.post(`http://localhost:8000/passenger/create-order`, { amount: flight.price }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      const data = {
        key: "rzp_test_nshgeiE7dp6JeU",
        amount: flight.price * 100,
        currency: "INR",
        name: "Ticket Payment",
        description: "Form Submission Payment",
        order_id: order.id,
        image: 'https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png',
        handler: async function (response) {
          try {
            console.log(response)
            console.log({
              name: name, email: email, phone: phone, age: age, address: address, flightNumber: flight.flightNumber, price: flight.price, seatType: flight.seatType, origin: flight.origin, destination: flight.destination,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            })

            const paymentRes = await axios.post(`http://localhost:8000/passenger/save-passenger/${id}`, {
              name: name, email: email, phone: phone, age: age, address: address, flightNumber: flight.flightNumber,
              price: flight.price, seatType: flight.seatType, origin: flight.origin, destination: flight.destination,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            })

            console.log(paymentRes)
            if (paymentRes.data.success) {
              navigate(`/flight/paymentSuccess/${paymentRes.data.passenger._id}`)
            }
            else {
              navigate('/flight/paymentFailed')
            }
          } catch (error) {
            console.log(error)
          }

        },
        modal: {
          ondismiss: function () {
            console.log("Payment window closed by user.");
            window.location.href = "/flight/paymentFailed";
          },
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },

      }

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(data);
        razorpay.open();
      } else {
        alert("Razorpay SDK failed to load. Check your internet connection.");
      }


    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>

      <div className='bookTicket-container'>
        {load ? <><Loader /></> : <>
          <Header src="https://res.cloudinary.com/dc728fl24/image/upload/v1749895043/Logo-cut_iut7om.png" height="85px" />
          <div className='bookTicket-top'>
            <span>Review Your Journey</span>
            <div className='bookTicket-top-left'>
              <div>
                <span>23:40</span>
                <span>{flight.origin}</span>
                <span>Jan 13,Wed</span>
              </div>

              <span><LocalAirportIcon style={{ rotate: "90deg" }} /> <span>{flight.duration}</span></span>
              <div>
                <span>23:40</span>
                <span>{flight.destination}</span>
                <span>Jan 13,Wed</span>
              </div>
              <div>

              </div>

            </div>
          </div>
          <form className='passenger-details' onSubmit={handlePayment}>
            <div className='passenger-form'>
              <div>
                <label>Name of Passenger</label>
                <input placeholder='Pasenger Name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label>Email address</label>
                <input placeholder='Pasenger Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <label>Contact details of Passenger</label>
                <input placeholder='Pasenger Contact No.' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div>
                <label>Age of Passenger</label>
                <input placeholder='Pasenger Age' type='number' value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <div>
                <label>Address of Passenger</label>
                <input placeholder='Pasenger Address' type='text' value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>
            <div className='payment'> 
              <span> <input style={{height:"30px",fontSize:"30px",cursor:"pointer"}} type='checkbox'  checked={active} onChange={handleActive}/>I confirm that all the information provided is accurate and that I have read and understood the terms and conditions</span> 
              <button type='submit' style={{cursor:"pointer"}}>INR  {flight.price} <VpnKeyIcon/></button>
            </div>


          </form>

          <Footer />
        </>}

      </div>
    </>
  )
}

export default BookTicket