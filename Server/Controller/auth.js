import { User } from "../DB/user.js";
import ErrorHandler from "../Middleware/error.js";
import cloudinary from "cloudinary"
import dotenv from "dotenv"
import { client } from "../server.js";
import { tokenKey } from "../Middleware/tokenkey.js";
dotenv.config()

//REGISTER

export const register = async (req, res, next) => {

  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill out all credentials"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("User already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role
  });
   const userSummary = { id: user._id.toString(), name: user.name, email: user.email, roles: user.role };

  const token = user.getSignedJwtToken();
  const key=tokenKey(token);
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,    
    sameSite: "none",
  };
  await client.setEx(key, process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000, JSON.stringify(userSummary));

  res.status(200).cookie("token", token, options).json({
    success: true,
    user,
    message: "User Registeration and Token generated successfully",
    token,
  });

};

//LOGIN

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const exist = await User.findOne({ email }).select("+password");

    if (!exist) return next(new ErrorHandler("Please enter correct credentials"));
    
    const userSummary = { id: exist._id.toString(), name: exist.name, email: exist.email, roles: exist.role };

    const match = await exist.matchPassword(password);
    if (!match) return next(new ErrorHandler("Please enter correct password"));
    const token = exist.getSignedJwtToken();
    const key=tokenKey(token);  
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,    
      sameSite: "none",
    }
    await client.setEx(key,process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000 , JSON.stringify(userSummary));
    res.status(200).cookie("token", token, options).json({
      success: true,
      user: exist,
      message: "User Login and Token generated successfully",
      token,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: "User Login failed",
    })
  }
}

//LOGOUT

export const logout = async (req, res, next) => {
   const {token} = req.cookies
  if (token) {
    await client.del(token);
  }
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,    
    sameSite: "none",
  });
  res.status(200).json({
    sucsess:true,
    message: 'Logged out successfully' });

}

//GET USER
export const getUser = async (req, res, next) => {
  try {  
  const cache = req.user;
  const user=JSON.parse(cache);
  res.status(200).json({
    success: true,
    user,
  })
    
  } catch (error) {
    res.status(404).json({
      success:false
    })
  }
}

//Update User
export const updateprofile = async (req, res, next) => {
  try {
    const id = req.user._id
    const user = await User.findById(id)
    const update = {}
    const { name, phone } = req.body
    if (req.file) {
      const pic = req.file
      if (user.profilePic?.public_id) {
        await cloudinary.UploadStream.destroy(user.profilePic.public_id);
      }
      const cloud = await cloudinary.uploader.upload(pic.tempFilePath);
      if (!cloud || cloud.error) {
        console.error("Clodinary Error: ", cloud.error || "Unknown cloud error");
        return next(new ErrorHandler("OOPS! Error file upload failed.", 500));
      }
      update.profilePic={
        public_id:cloud.public_id,
        url:cloud.secure_url,
      }
      
    }
    if(name) update.name=name
    if(phone) update.phone=phone
      
      const updated = await User.findByIdAndUpdate(id,update,{
        new:true,
        runValidators:true
      });
      res.status(200).json({
        success:true,
        message:"update successfull",
        updated,
      })
  } catch (error) {
    console.log(error);
  }


}
