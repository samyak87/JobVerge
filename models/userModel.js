import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({    
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],

        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: true,
    },
    location: { 
        type: String,
    },   
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);
 
export default User;