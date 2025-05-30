import User from "../models/userModel.js";


export const registerController = async(req, res) => {
    const { name, email, password, location } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
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

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
         if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: Object.values(error.errors).map((e) => e.message),
      });
    }
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};