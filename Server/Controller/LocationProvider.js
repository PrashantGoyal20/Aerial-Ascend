import { Location } from "../DB/Locations.js";
import ErrorHandler from "../Middleware/error.js";

//POST LOCATION PICS
export const locationPost=async(req,res,next)=>{
    try {
        const {location,locationPic}=req.body;
        const alreadyPresent=await Location.find({location:location})
        if(Object.keys(alreadyPresent).length>0){
            return next(new ErrorHandler(`Location Already present`, 404));
        }
        const locationObj=await Location.create({location,locationPic});
        res.status(200).json({
            success:true,
            locationObj
        })
    } catch (error) {
        console.log(error)
    }
}