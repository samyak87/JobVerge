import express from 'express';
import { getUsersController, updateUserController } from '../controllers/userController.js';
import userAuth from '../middlewares/authMiddleware.js';
import { authoriseAdmin } from '../middlewares/authoriseAdmin.js';
const router = express.Router();

router.get('/profile', userAuth, authoriseAdmin, getUsersController);

router.put('/update-user', userAuth, updateUserController);

export default router;