import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js ';
import testRoutes from './routes/testRoutes.js';
import authRoutes from './routes/authRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';

dotenv.config();

// mongoDB connection
connectDB();


const app = express();


// middlewares
app.use(express.json()); // for parsing application/json  
app.use(cors()); // for enabling CORS
app.use(morgan("dev")); // for logging HTTP requests


// want to use test routes
app.use('/api', testRoutes);

// want to use auth routes
app.use('/api/auth', authRoutes);

// want to use user routes
app.use('/api/user', userRoutes);

// want to use job routes
app.use('/api/jobs', jobsRoutes);

// validation error middleware
app.use(errorMiddleware);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
