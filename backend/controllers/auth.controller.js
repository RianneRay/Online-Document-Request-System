import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../model/user.model.js';
import { ENV_VAR } from "../config/EnvVar.js";

const generateToken = (userId) => {
  return jwt.sign({ userId }, ENV_VAR.JWT_SECRET_KEY, { expiresIn: ENV_VAR.JWT_EXPIRATION });
};

export const signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user',
    });

    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      msg: 'User registered successfully',
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      msg: 'Login successful',
      token,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

export const logout = (req, res) => {
  // Frontend will handle removing the JWT token from local storage/session storage or cookies
  res.status(200).json({ msg: 'Logout successful' });
};