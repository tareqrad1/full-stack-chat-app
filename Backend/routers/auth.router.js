import express from 'express';
import { checkAuth, login, logout, signup, updateUserProfile } from '../controllers/auth.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';
const router = express.Router();

router.get('/me', protectedRoute, checkAuth);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.put('/update', protectedRoute, updateUserProfile);

export default router;