import { Flights } from "../DB/flighs.js";
import { User } from "../DB/user.js";
import { Passenger } from "../DB/passenger.js";
import ErrorHandler from "../Middleware/error.js";

export const postPassenger=async (req,res,next)=>{
    const { role } = req.user;
    if (role === "admin") {
      return next(
        new ErrorHandler("Admin not allowed to access this resource.", 400)
      );
    }
    const {id}=req.params;
    const flight = await Flights.findById(id);
          if (!flight) {
            return next(new ErrorHandler("Flight not found.", 404));
          }
    const airline=flight.airline
    const flightNumber=flight.flightNumber
    const price=flight.price      
    const {name,email,phone,numberOfPassengers}=req.body;

  if (!name || !email || !phone ||!numberOfPassengers) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const passenger = await Passenger.create({
    name,email,phone,numberOfPassengers,airlineID:id,airline,flightNumber,price
  });

  
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    passenger,
  });


};
