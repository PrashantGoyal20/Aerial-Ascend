import express from "express"
import { getUser, login, logout, register, updateprofile } from "../Controller/auth.js"
import { authenticator } from "../Middleware/authenticator.js";
import { locationPost } from "../Controller/LocationProvider.js";

const router=express.Router()

router.post('/register',register);
router.post('/login',login);
router.get('/logout',authenticator,logout);
router.get('/getuser',authenticator,getUser);
router.post('/updateProfile',authenticator,updateprofile)


router.post("/locationpost",locationPost)

export default router
