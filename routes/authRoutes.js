import express from 'express';
import {registerController,loginController} from '../controllers/authController.js';
const router = express.Router();


// route for user registration  
router.post('/register', registerController);

// route for user login
router.post ('/login', loginController);

export default router;