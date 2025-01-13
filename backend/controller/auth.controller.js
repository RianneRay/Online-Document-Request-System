import express from "express";
import { User } from "../model/auth.model.js"
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
    await newUser.save()
    
    return res.status(200).json({success: true, message: "signup successfully"})
    
  } catch (e) {
    console.log("error in signup controller")
    res.status(500).json({success: false, message: e.message})
  }
}

export const logincontroller = async (req, res) => {
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
    
    return res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    })
    
  } catch (e) {
    console.log("error in login controller")
    res.status(500).json({success: false, message: e.message})
  }
}