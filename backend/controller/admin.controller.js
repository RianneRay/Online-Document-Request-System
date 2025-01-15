import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../model/auth.model.js";
import { Document } from "../model/document.model.js";
import { generateTokenAndSetCookies } from "../utils/generateToken.js"

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
  }
  
export const adminSignupController = async (req, res) => {
  const { username, email, password, role } = req.body;
  
  try {
    if(!username || !email || !password || !role) {
      return res.status(400).json({success: false, message: "please provide all field"})
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      return res.status(400).json({success: false, message: "invalid email"});
    }
    
    const existingUser = await User.findOne({ username });
    if(existingUser) {
      return res.status(400).json({success: false, message: "username already use"})
    }
    
    const existingEmail = await User.findOne({ email })
    if(existingEmail) {
      return res.status(400).json({success: false, message: "email already use"})
    }
    
    const hashedPassword = await hashPassword(password)
    const newUser = new User({
      username,
      email,
      role,
      password: hashedPassword
    });
    generateTokenAndSetCookies(newUser._id, res);
    await newUser.save()
    
    return res.status(200).json({success: true, user: {
      ...newUser._doc,
      password: ""
    }});
    
  } catch (e) {
    console.log("error in signup controller")
    res.status(500).json({success: false, message: e.message})
  }
}

export const adminLoginController = async (req, res) => {
  const { emailorusername, password } = req.body;
  
  try {
    if(!emailorusername || !password){
      return res.status(400).json({success: false, message: "all field required"})
    }
    
    const user = await User.findOne({
      $or: [{username: emailorusername}, {email: emailorusername}]
    })
    
    if(!user) {
      return res.status(400).json({success: false, message: "invalid credential"})
    }
    
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) {
      return res.status(400).json({success: false, message: "invalid credential"})
    }
    
    generateTokenAndSetCookies(user._id, res)
    return res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        ...user._doc,
        password: ""
      }
    })
    
  } catch (e) {
    console.log("error in login controller")
    res.status(500).json({success: false, message: e.message})
  }
}

export const getRequestList = async (req, res) => {
  try {
    const documentRequest = await Document.find({});
    res.json(documentRequest)
  } catch (e) {
    console.log("error in getRequestList controller")
    res.status(500).json({success: false, message: "internal server error"})
  }
}