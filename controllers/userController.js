import e from "express";

export const getUserProfile = (req, res) => {      
    const user = req.user; // Assuming user is set in the auth middleware
    res.status(200).json({
        userId: user.userId,
        name: user.name,
        email: user.email, // Assuming email is part of the user object
    });
    console.log('User profile retrieved successfully!');
    }

 export const updateUserController = async (req, res,next) => {
    const { name, email } = req.body;
    const user = req.user; // Assuming user is set in the auth middleware

    // Validate input
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    // Update user details (this would typically involve a database operation)
    user.name = name;
    user.email = email;

    // Respond with updated user information
    res.status(200).json({
        message: "User updated successfully",
        user: {
            userId: user.userId,
            name: user.name,
            email: user.email,
        },
    });
    console.log('User updated successfully!');
}   