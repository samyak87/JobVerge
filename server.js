import express from 'express';
import dotenv from 'dotenv';

import cors from 'cors';
import morgan from 'morgan';

import connectDB from './config/db.js ';
import testRoutes from './routes/testRoutes.js';



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



const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
