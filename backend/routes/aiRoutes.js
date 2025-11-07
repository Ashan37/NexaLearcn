import express from 'express';
import { handleChat, getChatHistory } from '../controllers/aiController.js';
import { protectAdmin } from '../middlewares/adminValidation.js'; 

const router = express.Router();

router.post('/chat', protectAdmin, handleChat);

router.get('/history', protectAdmin, getChatHistory);

export default router;
