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
       
       validate: {
      validator: function (value) {
        return validator.isEmail(value);
      },
      message: 'Please provide a valid email address'
    }
    },
    password: {
        type: String,
        required:  [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
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