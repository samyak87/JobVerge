import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

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
    role: {
        type: String,
        enum: ['user', 'admin'], // Define the roles available
        default: 'user' // Default role is user
    }

}, {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
        if (!this.isModified('password')) return; 
        const salt = await bcrypt.genSalt(10); // Generate a salt
        this.password = await bcrypt.hash(this.password, salt); // Hash the password with the salt
        next(); // Proceed to save the user
});



// function to compare the provided password with the hashed password in the database
userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password); // Compare the provided password with the hashed password
    return isMatch; // Return true if they match, false otherwise
};

// JSON Web Token (JWT) method to generate a token for the user
userSchema.methods.createJWT = function () {
  return JWT.sign(
    {
      userId: this._id,
      name: this.name,
      role: this.role   // ✅ Add this line
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};


const User = mongoose.model('User', userSchema);
 
export default User;