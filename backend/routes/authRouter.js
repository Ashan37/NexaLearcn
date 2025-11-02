import express from "express";
import { signupValidation, signinValidation } from "../middlewares/authValidation.js";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);
router.post("/signin", signinValidation, signin);

export default router;
