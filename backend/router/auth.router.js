import express from "express";
import { signupController, loginController, requestController, logoutController, authCheckController} from "../controller/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router = express.Router();

router.post("/signup", signupController)
router.post("/login", loginController)
router.post("/request", protectRoute, requestController)
router.post("/logout", logoutController)

router.get("/authCheck", protectRoute, authCheckController)

export default router;