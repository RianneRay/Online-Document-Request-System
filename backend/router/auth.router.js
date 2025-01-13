import express from "express";
import { signupController, logincontroller } from "../controller/auth.controller.js"

const router = express.Router();

router.post("/signup", signupController)
router.post("/login", logincontroller)

export default router;