import express from 'express';
import { getUserController, updateUserController } from '../controllers/userController.js';
import userAuth from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/profile', userAuth, getUserController);

router.put('/update-user', userAuth, updateUserController);

export default router;