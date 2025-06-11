import { Flights } from "../DB/flighs.js";
import { Location } from "../DB/Locations.js";
import { User } from "../DB/user.js";
import ErrorHandler from "../Middleware/error.js";


//POST FLIGHT
export const postFlight=async(req,res,next)=>{
    const {role }=req.user;
    if(role=="passenger")
        return next(new ErrorHandler("User with current role can't post jobs", 401));
        const {flightNumber,origin,destination,departureTime,arrivalTime,duration,price,originCoordinates,destinationCoordinates,seatType,seatsAvailable}=req.body 
    if(!flightNumber || !origin || !destination || !departureTime || !arrivalTime || !duration || !price || !originCoordinates || !destinationCoordinates ||!seatType || !seatsAvailable ){
        return next(new ErrorHandler("Please fill all the details of the flight"));
    }

    const duplicate=await Flights.findOne({flightNumber})
    if(duplicate) return next(new ErrorHandler("Flight Number Already Register",404))
    const airlineID=req.user._id;
    const airlineDetails=await User.findById(airlineID);
    const airline=airlineDetails.name;
    const newFlight=await Flights.create({airlineID,airline,flightNumber,origin,destination,departureTime,arrivalTime,duration,price,originCoordinates,destinationCoordinates,seatType,seatsAvailable});
    res.status(201).json({
        success: true,
        message:"Flight created successfully",
        airlineDetails,
        newFlight
    });
    
  
}

//UPDATE FLIGHTS
export const updateFlight=async(req,res,next)=>{
    const {role}=req.user;
    if(role=="passenger")
        return next(new ErrorHandler("User with current role can't post jobs", 401));

    const { id } = req.params;
    let flight = await Flights.findById(id);
    if (!flight) {
      return next(new ErrorHandler("OOPS! Error 404 not found.", 404));
    }
    flight = await Flights.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "Flight Updated!",
    });


}

//DELETE FLIGHT
export const deleteFlight = async (req, res, next) => {
    const { role } = req.user;
    if (role === "passenger") {
      return next(
        new ErrorHandler("Passengers are not allowed to access this resource.", 400)
      );
    }
    const { id } = req.params;
    let flight = await Flights.findById(id);
    if (!flight) {
      return next(new ErrorHandler("OOPS! Error 404 not found.", 404));
    }
    await flight.deleteOne();
    res.status(200).json({
      success: true,
      message: "Flight Deleted!",
    });
  };

//VIEW SINGLE FLIGHT
export const getSingleFlight = async (req, res, next) => {
    const { id } = req.params;
    try {
      const flight = await Flights.findById(id);
      if (!flight) {
        return next(new ErrorHandler("Flight not found.", 404));
      }
      res.status(200).json({
        success: true,
        flight,
      });
    } catch (error) {
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));
    }
  };

//GET OUR FLIGHTS

export const getOurFlight=async(req, res, next)=>{
const id=req.user;
 try {
  const flights=await Flights.find({airlineID:id});
  if(!flights) return next(new ErrorHandler("Flight not found.", 404));
  res.status(200).json({
        success: true,
        flights,
      });

 } catch (error) {
  return next(new ErrorHandler(`Invalid ID / CastError`, 404));
 }
}

//GET ALL FLIGHTS
export const getAllFlights = async (req, res, next) => {
    try {
       const {
      origin,
      destination,
      minPrice,
      maxPrice,
      date
    } = req.query;

    const query={}

    if(origin && destination){
      query.origin = new RegExp(origin, 'i');
      query.destination = new RegExp(destination, 'i');
    }
    else if(origin && source && maxPrice && minPrice){
      query.origin = new RegEx(origin, 'i');
      query.destination = new RegExp(destination, 'i');
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    else if(origin && date && date){
       query.origin = new RegEx(origin, 'i');
      query.destination = new RegExp(destination, 'i');
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.departureTime = { $gte: start, $lte: end };
    }
    const location={};
    if(destination){
      const locationObj=await Location.findOne({location:origin})
      location.location=locationObj.location;
      location.locationPic=locationObj.locationPic;
    }
    const flights=await Flights.find(query);
    res.status(200).json({
        success: true,
        flights,
        location
      });

    } catch (error) {
      console.log(error)
      return next(new ErrorHandler(`Invalid ID / CastError`, 404));

    }
   }