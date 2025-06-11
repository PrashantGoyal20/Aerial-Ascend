import mongoose from "mongoose";


const PassengerSchema = new mongoose.Schema({
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
    numberOfPassengers: {
        type: Number,
        required: true
    },

    airlineID: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flights',
        required: true
    },
    airline: {
        type: String,
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
    OriginCoordinates:{
        type:Number,
        require:true,
    },
    DestinationCoordinates:{
        type:Number,
        require:true,
    },
    seatType:{
        type:String,
        enum:['Economy','Premium Economy','Business','First'],
        default:"Economy",
    },
    status: {
        type: String,
        enum: ["Confirmed", "Waiting", "Cancelled"],
        default: "Confirmed"
    },
});

export const Passenger = mongoose.model("Passenger", PassengerSchema);