import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import {errorMiddleware} from './Middleware/error.js'
import userRouter from "./Routes/auth.js"
import flightRoute from "./Routes/flights.js"
import passengerRoute from "./Routes/passenger.js"
import cors from "cors"
import cloudinary from "cloudinary"
import fileUpload from "express-fileupload"


const app=express()
dotenv.config()
app.use(express.urlencoded({extended:true}));
app.use(errorMiddleware)
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

cloudinary.v2.config({ 
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_API_SECRET 
});
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

app.use('/auth',userRouter)
app.use('/flights',flightRoute)
app.use('/passenger',passengerRoute)

const PORT=process.env.PORT
mongoose.connect(process.env.MONGO_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
})
.then(app.listen(PORT,()=>{
    console.log("Mongoose Connected")
})).catch((err)=>
    console.log(err)
)




