import { Flights } from "../DB/flighs.js";
import { Passenger } from "../DB/passenger.js";
import { Location } from "../DB/Locations.js";
import { User } from "../DB/user.js";
import ErrorHandler from "../Middleware/error.js";


//POST FLIGHT
export const postFlight = async (req, res, next) => {
  const { role } = req.user;
  if (role == "passenger")
    return next(new ErrorHandler("User with current role can't post jobs", 401));
  const { flightNumber, origin, destination, departureTime, arrivalTime, duration, price, originCoordinates, destinationCoordinates, seatType, seatsAvailable } = req.body
  if (!flightNumber || !origin || !destination || !departureTime || !arrivalTime || !duration || !price || !originCoordinates || !destinationCoordinates || !seatType || !seatsAvailable) {
    return next(new ErrorHandler("Please fill all the details of the flight"));
  }

  const duplicate = await Flights.findOne({ flightNumber })
  if (duplicate) return next(new ErrorHandler("Flight Number Already Register", 404))
  const airlineID = req.user._id;
  const airlineDetails = await User.findById(airlineID);
  const airline = airlineDetails.name;
  const newFlight = await Flights.create({ airlineID, airline, flightNumber, origin, destination, departureTime, arrivalTime, duration, price, originCoordinates, destinationCoordinates, seatType, seatsAvailable });
  res.status(201).json({
    success: true,
    message: "Flight created successfully",
    airlineDetails,
    newFlight
  });


}

//UPDATE FLIGHTS
export const updateFlight = async (req, res, next) => {
  const { role } = req.user;
  if (role == "passenger")
    return next(new ErrorHandler("User with current role can't post jobs", 401));

  const { id } = req.params;
  let flight = await Flights.findById(id);
  if (!flight) {
    return next(new ErrorHandler("OOPS! Error 404 not found.", 404));
  }
  const newflight = await Flights.findByIdAndUpdate(id, { $set: { status: 'Cancelled' } }, {
    new: true,
    runValidators: true
  });

  await Passenger.updateMany({ airlineID: id }, { $set: { status: 'Cancelled' } }, {
    new: true,
    runValidators: true
  })
  res.status(200).json({
    success: true,
    message: "Flight Updated!",
    newflight
  });


}

//VIEW SINGLE FLIGHT
export const getSingleFlight = async (req, res, next) => {

  try {
    const { id } = req.params;
    const { seatType } = req.query
    const flight = await Flights.findById(id);
    if (!flight) {
      return next(new ErrorHandler("Flight not found.", 404));
    }
    const index = flight.seatType.indexOf(seatType)
    const ans = {}

    res.status(200).json({
      success: true,
      flight,
      index: index,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));

  }
};


//GET ALL FLIGHTS
export const getAllFlights = async (req, res, next) => {
  try {
    const {
      origin,
      destination,
      minPrice,
      maxPrice,
      arrivalTime,
      departureTime
    } = req.query;

    const query = {}

    if (origin && destination) {
      query.origin = new RegExp(origin, 'i');
      query.destination = new RegExp(destination, 'i');
    }
    else if (origin && source && maxPrice && minPrice) {
      query.origin = new RegEx(origin, 'i');
      query.destination = new RegExp(destination, 'i');
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    else if (destination && (departureTime || arrivalTime)) {
      query.destination = new RegExp(destination, 'i');
      if (arrivalTime) {
        const arrivalstart = new Date(arrivalTime);
        const arrivalend = new Date(arrivalTime);
        console.log(arrivalend)
        arrivalend.setHours(23, 59, 59, 999);
        query.arrivalTime = { $gte: arrivalstart, $lte: arrivalend };
      }
      else if (departureTime) {
        const departurestart = new Date(departureTime);
        const departureend = new Date(departureTime);
        console.log(departureTime)
        departureend.setHours(23, 59, 59, 999);
        query.departureTime = { $gte: departurestart, $lte: departureend };
      }


    }
    else if (destination) {
      query.destination = new RegExp(destination, 'i');
    }
    var locationObj = {};
    if (destination) {
      locationObj = await Location.findOne({ location: { $regex: destination, $options: 'i' } });
    }


    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);

    const flights = await Flights.find(query);
    res.status(200).json({
      success: true,
      flights,
      location:locationObj,
    });

  } catch (error) {
    console.log(error)
  }
}

export const searchLocation = async (req, res, next) => {
  const { destination } = req.query;
  if (!destination) return;
  const locations = await Location.findOne({ location: { $regex: destination, $options: 'i' } });
  res.status(200).status({
    success: true,
    location:locations
  })
}