import express from "express";
import { deleteFlight, getAllFlights, getOurFlight, getSingleFlight, postFlight, updateFlight } from "../Controller/flights.js";
import { authenticator } from "../Middleware/authenticator.js";

const router=express.Router();

router.post('/postFlight',authenticator,postFlight);
router.put('/updateFlight/:id',authenticator,updateFlight);
router.delete('/deleteFlight/:id',authenticator,deleteFlight);
router.get('/getallflights',getAllFlights);
router.get('/getOurflights',authenticator,getOurFlight);
router.get('/flightDetails/:id',authenticator,getSingleFlight);


export default router;