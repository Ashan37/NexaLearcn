import express from 'express';
import {
  getWeeklyActivity,
  updateWeeklyActivity,
  trackLearningSession,
  getUserStatistics
} from '../controllers/userActivityController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// All routes are protected - user must be authenticated
router.get('/weekly', protect, getWeeklyActivity);
router.post('/weekly', protect, updateWeeklyActivity);
router.post('/track', protect, trackLearningSession);
router.get('/statistics', protect, getUserStatistics);

export default router;
