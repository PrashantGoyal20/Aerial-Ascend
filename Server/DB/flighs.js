import mongoose from "mongoose";


const FlightSchema = new mongoose.Schema({
    airlineID: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    airline:{
        type: String,
        required: true
    },
    flightNumber: {
        type: String,
        required: true,
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
        
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: [Number],
        required: true
    },
    originCoordinates:{
        type:[String],
        required:true,
    },
    destinationCoordinates:{
        type:[String],
        required:true,
    },
    seatType:{
       type:[String],
       required:true,
    },
    seatsAvailable: {
        type: [Number],
        required: true
    },
    status: {
        type: String,
        enum: ["On Time", "Expired", "Cancelled"],
        default: "On Time",
    },
});

export const Flights = mongoose.model("Flights", FlightSchema);