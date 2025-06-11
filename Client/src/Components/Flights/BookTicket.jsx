import React, { useState } from 'react'

const BookTicket = () => {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState()
    const [seats,setSeats]=useState()
  return (
    <div>
        <input placeholder='name' type='text' value={name} onChange={(e)=>{setName(e.target.value)}}></input>
        <input placeholder='email' type='text' value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
        <input placeholder='phone' type='number' value={phone} onChange={(e)=>{setPhone(e.target.value)}}></input>
        <input placeholder='seats' type='number' value={seats} onChange={(e)=>{setSeats(e.target.value)}}></input>
        <button>Proceed to pay</button>
    </div>
  )
}

export default BookTicket