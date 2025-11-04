import express from "express";
import { adminSignin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/signin", adminSignin);
router.get("/dashboard", (req, res) => {
    res.json({ message: "Welcome Admin" });
});

export default router;