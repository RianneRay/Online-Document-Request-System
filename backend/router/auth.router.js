import express from "express";
import { signupController, loginController, requestController} from "../controller/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router();

router.post("/signup", signupController)
router.post("/login", loginController)
router.post("/request", protectRoute, requestController)

export default router;