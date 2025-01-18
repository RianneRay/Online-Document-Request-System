import express from "express";
import { User } from "../model/auth.model.js"
import { Document } from "../model/document.model.js"
import { generateTokenAndSetCookies } from "../utils/generateToken.js"
import bcrypt from "bcryptjs"

async function hashPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
  }

export const signupController = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    if(!username || !email || !password) {
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
      return res.status(400).json({success: falae, message: "email already use"})
    }
    
    const hashedPassword = await hashPassword(password)
    const newUser = new User({
      username,
      email,
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

export const loginController = async (req, res) => {
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

export const requestController = async (req, res) => {
  const { title, count } = req.body;
  
  const userId = req.user._id;
  
  try {
    if (!title || count === undefined) {
      return res.status(400).json({ success: false, message: "all fields required" });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    
    const newRequest = new Document({
      title,
      count,
      requestedBy: userId
    });
    
    const savedRequest = await newRequest.save();
    
    user.requestDocument.push(savedRequest._id);
    await user.save();
    
    const populatedUser = await User.findById(userId)
      .populate({
        path: "requestDocument",
        select: "title count status releaseData",
        populate: {
          path: "requestedBy",
          select: "username"
        }
      });
      
    return res.status(201).json(populatedUser);
  } catch (e) {
    console.log("error in request controller", e);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.clearCookie("jwt-request");
    res.status(200).json({success: true, message:"Logout Success"});
  } catch (e) {
    console.log("error in logout Controller", e.message)
    res.status(500).json({success:false, message:"internal server error"});
  }
}

export const authCheckController = async (req, res) => {
  try {
    res.status(200).json({success: true, user: req.user})
  } catch (error) {
    console.log("error in authCheck Controller", error.message)
    res.status(500).json({success: false, message: "internal server error"})
  }
}