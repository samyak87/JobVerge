import express from 'express';
import {registerController} from '../controllers/authController.js';
const router = express.Router();


// Example route for user registration  
router.post('/register', registerController);

export default router;