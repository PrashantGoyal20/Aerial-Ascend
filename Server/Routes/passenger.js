import express from "express";
import { authenticator } from "../Middleware/authenticator.js";
import { postPassenger } from "../Controller/passenger.js";

const router=express.Router()

router.post('/postPassenger/:id',authenticator,postPassenger)

export default router