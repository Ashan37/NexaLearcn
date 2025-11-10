import express from 'express';
import { handleChat, getChatHistory } from '../controllers/aiController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/chat', protect, handleChat);

router.get('/history', protect, getChatHistory);

export default router;
