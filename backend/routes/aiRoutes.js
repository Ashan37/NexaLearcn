// backend/routes/aiRoutes.js
import express from "express";
import { getAdvice } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", getAdvice);

export default router;
