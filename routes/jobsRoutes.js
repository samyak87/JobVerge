import express from 'express';
import { createJobsController, getJobsController, updateJobController, deleteJobController, jobStatsController  } from '../controllers/jobsController.js';
import userAuth from '../middlewares/authMiddleware.js';
import { authoriseAdmin } from '../middlewares/authoriseAdmin.js';
const router = express.Router();

// creating job route
router.post('/create-job',userAuth, authoriseAdmin, createJobsController);

// getting jobs route
router.get('/get-jobs',userAuth,getJobsController);

// modify job route
router.patch('/update-job/:id', userAuth, authoriseAdmin, updateJobController);

// delete job route
 router.delete('/delete-job/:id', userAuth, authoriseAdmin, deleteJobController); 

 // job stats filter
 router.get('/job-stats', userAuth, jobStatsController);

export default router;
