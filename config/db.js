import mongoose from 'mongoose';


const connectDB = async() => {
    try{
       const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected successfully to : ${mongoose.connection.host}`);
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); 
    }
}

export default connectDB;