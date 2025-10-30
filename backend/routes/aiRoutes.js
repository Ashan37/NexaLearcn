import express from "express";
import { getAdvise } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", getAdvise);

export default router;
