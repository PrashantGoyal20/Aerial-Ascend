import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
   location:{
    type:String,
    require:true
   },
   locationPic:{
    type:String,
    require:true
   }

});

export const Location = mongoose.model("Location", LocationSchema);