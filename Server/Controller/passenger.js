import { Flights } from "../DB/flighs.js";
import { User } from "../DB/user.js";
import { Passenger } from "../DB/passenger.js";
import ErrorHandler from "../Middleware/error.js";
import { razorpay } from "../server.js";
import crypto from "crypto"
import puppeteer from "puppeteer";
import fs from "fs"


export const postPassenger=async (req,res,next)=>{
    const {id}=req.params;
    const flight = await Flights.findById(id);
          if (!flight) {
            return next(new ErrorHandler("Flight not found.", 404));
          }
    const {name,email,phone,age,address,flightNumber,price,seatType,origin,destination, razorpay_payment_id, razorpay_order_id, razorpay_signature}=req.body;

 if (!name || !email || !phone || !age || !address || !price || !origin || !destination
    || !flightNumber || !seatType ||  !razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
    return next(new ErrorHandler("Please provide all details.", 400));
  }

  const signature = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(signature.toString())
    .digest("hex");

    if(expectedSignature==razorpay_signature){
      const passenger = await Passenger.create({
          name,email,phone,age,address,airlineID:id,flightNumber,price,seatType,origin,destination, razorpay_payment_id, razorpay_order_id, razorpay_signature
  });
  res.status(200).json({
    success: true,
    message: "Application Submitted!",
    passenger,
  });
    }
    else{
      res.status(400).json({
    success: false,
    message: "Invalid signature",
  });
    }
};

export const searchPassenger=async(req,res,next)=>{
  let {pnr,arrivalTime,departureTime}=req.query
  try {
    if(!pnr) return new ErrorHandler("Enter all Details",400)
      pnr=pnr.toString()
    console.log(typeof pnr + pnr)
    const passenger=await Passenger.findById({_id:pnr});
    if(!passenger){
      
    }
    const flight=await Flights.find({flightNumber:passenger.flightNumber})
    res.status(200).json({
    success:true,
    passenger,
    flight
    })
  } catch (error) {
    console.log(error)
    res.json({
        message:"No such Passenger Found. Make sure you enter Correct PNR"
      })
  }
  
}


export const createOrder=async(req,res,next)=>{

   const {amount}=req.body;
   const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
  };
  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
    console.log(error)
  }
}

export const passengerInfo=async(req,res,next)=>{
  try {
     const {id}=req.params
  const passenger=await Passenger.findById(id)
  if(!passenger){
    return new ErrorHandler("No passenger Found",404)
  }
  const flight=await Flights.findById(passenger.airlineID)
  res.status(200).json({
    success:true,
    flight,
    passenger
  })
  } catch (error) {
        console.log(error)
  }
 
}

export const ticketGenerator=async(req,res,next)=>{
  try {
    const {id}=req.params
  const passenger=await Passenger.findById(id)
  if(!passenger){
    return new ErrorHandler("No passenger Found",404)
  }
  // const {name, email, phone, age, address,flightNumber, price, seatType,origin, destination,arrivalTime, departureTime,pnr,
  //   airlineName,logoUrl}
  const flight=await Flights.findById(passenger.airlineID)
  var html = fs.readFileSync('./Controller/ticket.html', 'utf8');
  html = html
    .replace('{{NAME}}', passenger.name)
    .replace('{{EMAIL}}', passenger.email)
    .replace('{{PNR}}',passenger._id)
    .replace('{{PHONE}}', passenger.phone)
    .replace('{{FLIGHT_NUMBER}}', passenger.flightNumber)
    .replace('{{ORIGIN}}', passenger.origin)
    .replace('{{DESTINATION}}', passenger.destination)
    .replace('{{SEATTYPE}}',passenger.seatType)
    .replace('{{PRICE}}',passenger.price)
    .replace('{{DEPARTURE}}',flight.departureTime)
    .replace('{{ARRIVAL}}',flight.arrivalTime)
    .replace('{{DUARTION}}',flight.duration)

  const browser = await puppeteer.launch({
            headless: false, 
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });;
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 })
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="ticket.pdf"',
      'Content-Length': pdfBuffer.length,
    });

    const base64Pdf = pdfBuffer.toString('base64');
        
        res.json({ 
            success: true, 
            pdf: base64Pdf,
            fileName: `airline_ticket_${passenger.name?.replace(/\s+/g, '_') || 'passenger'}.pdf`
        });

  } catch (error) {
    console.log(error)
  }
  }
