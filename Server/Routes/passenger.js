import express from "express";
import { authenticator } from "../Middleware/authenticator.js";
import { allBookings, cancellTicket, createOrder, passengerInfo, postPassenger, searchPassenger, ticketGenerator } from "../Controller/passenger.js";

const router=express.Router()

router.post('/create-order',authenticator,createOrder )
router.post('/save-passenger/:id',authenticator,postPassenger)
router.get('/getBookings',authenticator,allBookings)
router.get('/cancelTicket/:id',authenticator,cancellTicket)
router.get('/success/:id',ticketGenerator)
router.get('/passengerInfo/:id',passengerInfo)
router.get('/search-passeneger',searchPassenger)

export default router