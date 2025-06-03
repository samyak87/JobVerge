import userModel from '../models/userModel.js';

export const getUsersController = async(req, res) => {      
     // getting all users
    const users = await userModel.find({}).select("-password"); // Exclude password field
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        users,

    });
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