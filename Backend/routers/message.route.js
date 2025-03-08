import express from 'express';
import { addMessage, getMessages, getUsersForSidebar } from '../controllers/message.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = express.Router();

router.get('/users', protectedRoute, getUsersForSidebar);
router.get('/:id', protectedRoute, getMessages);

router.post('/send/:id', protectedRoute, addMessage);


export default router;