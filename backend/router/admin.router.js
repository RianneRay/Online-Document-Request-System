import express from "express";
import { adminSignupController, adminLoginController, getRequestList, adminLogoutController, authCheckController } from "../controller/admin.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router();

router.post("/signup", adminSignupController)
router.post("/login", adminLoginController)
router.get("/requestlist", getRequestList)
router.post("/logout", adminLogoutController);

router.get("/authCheck", protectRoute, authCheckController)
export default router;