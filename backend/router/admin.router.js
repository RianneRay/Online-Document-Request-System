import express from "express";
import { adminSignupController, adminLoginController, getRequestList } from "../controller/admin.controller.js"

const router = express.Router();

router.post("/signup", adminSignupController)
router.post("/login", adminLoginController)
router.get("/requestlist", getRequestList)
export default router;