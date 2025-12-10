import express from "express";
import { getAllFlights, getSingleFlight, postFlight, searchLocation, updateFlight } from "../Controller/flights.js";
import { authenticator } from "../Middleware/authenticator.js";
import { locationPost } from "../Controller/LocationProvider.js";

const router=express.Router();

router.post('/postFlight',authenticator,postFlight);
router.get('/update-flight/:id',updateFlight)
router.post('/postlocation',locationPost);
router.get('/getallflights',getAllFlights);
router.get('/flightDetails/:id',getSingleFlight);
router.get('/searchLocation',searchLocation)


export default router;
