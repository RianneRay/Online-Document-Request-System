import express from 'express';
import { signup, login, logout } from '../controllers/auth.controller.js';
import { validateSignup, validateLogin } from '../middleware/validator.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);

router.post('/login', validateLogin, login);

router.post('/logout', logout);

router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({ msg: 'Welcome to your profile', userId: req.user });
});

export default router;