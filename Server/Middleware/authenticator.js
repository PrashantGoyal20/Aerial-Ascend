import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { User } from "../DB/user.js";
import { client } from "../server.js";
import { tokenKey } from "./tokenkey.js";

export const authenticator=async(req,res,next)=>{
     
    const { token } = req.cookies;
  if (!token) {
    return next(res.status(200).json({success:false,message:"Not authorized to access this resource"}));

  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const key=tokenKey(token);
  req.user = await client.get(key);

  next();
}