import express from 'express';
import {testController,testController2} from '../controllers/testController.js';

const router = express.Router();

// test route
router.get('/test', testController);
router.post('/post-test', testController2);

export default router;