import express from 'express';
import { getUserProfile, updateUserController } from '../controllers/userController.js';
import userAuth from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/profile', userAuth, getUserProfile);

router.put('/update-user', userAuth, updateUserController);
export default router;