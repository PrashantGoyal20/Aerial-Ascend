import { Location } from "../DB/Locations.js";

//POST LOCATION PICS
export const locationPost=async(req,res,next)=>{
    try {
        const {location,locationPic}=req.body;
        const locationObj=await Location.create({location,locationPic});
        res.status(200).json({
            success:true,
            locationObj
        })
    } catch (error) {
        console.log(error)
    }
}