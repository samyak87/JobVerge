import User from "../models/userModel.js";


export const registerController = async(req, res,next) => {
    const { name, email, password, location } = req.body;

    // Validate input
    if (!name || !email || !password) {
        next("Please fill all the fields");
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            next("User already exists");
            // return res.status(400).json({ message: "User already exists" });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            location,
        });

        // Save user to database
        await user.save();
        

        // Generate JWT token
        const token = user.createJWT();

        
        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(201).json({ message: "User registered successfully", user,token });
    } catch (error) {
         if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: Object.values(error.errors).map((e) => e.message),
      });
    }
      next(error); // Pass the error to the next middleware (error handler)
    }
};



export const loginController = async(req, res ) => {        
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        next("Please fill all the fields");
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            next("User does not exist");
            // return res.status(400).json({ message: "User does not exist" });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            next("Invalid credentials");
            // return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = user.createJWT();
        // Set token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.status(200).json({ message: "User logged in successfully", user, token });
    } catch (error) {
         if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: Object.values(error.errors).map((e) => e.message),
      });
    }
      next(error); // Pass the error to the next middleware (error handler)
    }
}