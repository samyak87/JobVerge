import userModel from '../models/userModel.js';

export const getUserController = (req, res) => {      
    // const user = req.user; // Assuming user is set in the auth middleware
    // res.status(200).json({
    //     userId: user.userId,
    //     name: user.name,
    //     email: user.email, // Assuming email is part of the user object
    // });
    // console.log('User profile retrieved successfully!');
    }

 export const updateUserController = async (req, res,next) => {
    const { name, email, password,location } = req.body;

    // Validate input
    if (!name || !email || !location) {
        next({ message: "All fields are required" });
    }

    // Here you would typically check if the user exists in the database
    const user = await userModel.findOne({ _id: req.user.userId });
    user.name = name;
    user.email = email; 
    user.location = location;


    

    await user.save();

    const token = user.createJWT(); // Assuming createJWT is a method on the user model

    res.status(200).json({
        success: true,
        message: "User updated successfully",
        token,
        user: {
            name: user.name,
            email: user.email,
            location: user.location,
        },
    });
}   