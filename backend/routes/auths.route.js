import express from "express";
import {
  operatorLogin,
  operatorLogout,
  operatorSignup,
  operatorVerifyEmail,
  forgotPassword,
  resetPassword,
  checkAuths,
} from "../controllers/auths.controller.js";
import { verifyTokens } from "../middleware/verifyTokens.js";

const router = express.Router();

// Existing routes
router.get("/check-auths", verifyTokens, checkAuths);
router.post("/operator-signup", operatorSignup);
router.post("/operator-login", operatorLogin);
router.post("/operator-logout", operatorLogout);
router.post("/operator-verify-email", operatorVerifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);  

export default router;
