import mongoose from "mongoose";


const PassengerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    origin:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    address:{
        type:String
    },
    airlineID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flights',
        required: true
    },
    flightNumber: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    seatType:{
        type:String,
        enum:['Economy','Premium Economy','Business','First'],
        default:"Economy",
    },
    status: {
        type: String,
        enum: ["Confirmed", "Cancelled"],
        default: "Confirmed"
    },
    razorpay_payment_id:{
        type: String
    },
    razorpay_order_id:{
        type: String
    },
    razorpay_signature:{
        type: String
    },
});

export const Passenger = mongoose.model("Passenger", PassengerSchema);