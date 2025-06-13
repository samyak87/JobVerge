import express from 'express';
import { createJobsController, getJobsController} from '../controllers/jobsController.js';
import userAuth from '../middlewares/authMiddleware.js';
import { authoriseAdmin } from '../middlewares/authoriseAdmin.js';
const router = express.Router();

router.post('/create-job',userAuth, authoriseAdmin, createJobsController);
router.get('/get-jobs',userAuth,getJobsController);

export default router;
