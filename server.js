import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js ';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';

import { clean } from 'xss-clean/lib/xss.js';

dotenv.config();

// mongoDB connection
connectDB();


const app = express();


// middlewares
app.use(helmet()); // for securing HTTP headers
app.use(express.json()); // for parsing application/json  
app.use(cors()); // for enabling CORS
app.use(morgan("dev")); // for logging HTTP requests
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
}));
// want to use test routes
app.use('/api', testRoutes);

// want to use auth routes
app.use('/api/auth', authRoutes);

// want to use user routes
app.use('/api/user', userRoutes);

// want to use job routes
app.use('/api/jobs', jobsRoutes);

// want to use resume routes\
app.use('/api/resume', resumeRoutes);

// validation error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
