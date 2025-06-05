import express from 'express';
import { jobsController } from '../controllers/jobsController.js';
import userAuth from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/create-job',userAuth, jobsController);
router.get('/get-jobs',jobsController);

export default router;
