import jwt from "jsonwebtoken"
import { User } from "../model/auth.model.js"
import ENV_VAR from "../config/ENV_VAR.js"

export const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookie received in request:", req.cookies)
    
    const token = req.cookies["jwt-request"];
    
    if(!token){
      return res.status(401).json({success: false, message: "unauthorized no token provided"})
    }
    
    const decoded = jwt.verify(token, ENV_VAR.JWT_SECRET_KEY);
    
    if(!decoded) {
      return res.status(401).json({success: false, message: "unauthorized invalid token"})
    }
    
    const user = await User.findById(decoded.userId).select("-password");
    if(!user) {
      return res.status(404).json({success: false, message: "user not found"})
    }
    
    req.user = user;
    
    next();
  } catch (e) {
    console.log("error in protectRoute", e.message)
    res.status(500).json({success: false, message: "internal server error"})
  }
}