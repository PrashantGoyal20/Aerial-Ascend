import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { User } from "../DB/user.js";

export const authenticator=async(req,res,next)=>{
    const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_KEY);

  req.user = await User.findById(decoded.id);

  next();
}