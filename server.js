import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js ';
import testRoutes from './routes/testRoutes.js';

dotenv.config();

// mongoDB connection
connectDB();


const app = express();

// want to use test routes
app.use('/api', testRoutes);


// middlewares
app.use(express.json()); // for parsing application/json  

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});
