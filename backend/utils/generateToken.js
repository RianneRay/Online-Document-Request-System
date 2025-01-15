import jwt from "jsonwebtoken";
import ENV_VAR from "../config/ENV_VAR.js";

export const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({userId}, ENV_VAR.JWT_SECRET_KEY, {expiresIn: '15d'});
  
  res.cookie("jwt-request", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'strict',
    secure: false
  })
  console.log("setting Cookie: jwt-request", token)
  return token;
}