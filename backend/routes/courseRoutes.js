import express from 'express';
import {addCourse,getCourses} from '../controllers/courseController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/add",protectAdmin, addCourse);
router.get("/", getCourses);
export default router;