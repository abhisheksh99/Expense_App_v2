import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

//User Registeration
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    
    // Validate
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are required")
    }
    
    // Check if user already exists
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(409)
        throw new Error("User already exists")
    }
    
    // Hash the user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create the user and save in the db
    const userCreated = await User.create({
        username,
        email,
        password: hashedPassword
    })
    
    // Send the response
    if (userCreated) {
        res.status(201).json({
            _id: userCreated._id,
            username: userCreated.username,
            email: userCreated.email,
            message: "User created successfully"
        })
    } else {
        res.status(400)
        throw new Error("Invalid user data")
    }
})

//Login
export const loginUser = asyncHandler(async (req, res) => {
    // Get user data
    const { email, password } = req.body

    // Check if email and password are provided
    if (!email || !password) {
        res.status(400)
        throw new Error("Email and password are required")
    }

    // Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        res.status(401)
        throw new Error("Invalid credentials")
    }

    // Compare user password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        res.status(401)
        throw new Error("Invalid credentials")
    }

    // Generate a token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })

    // Send the response
    res.status(200).json({
        message: "Login successful",
        token,
        id: user._id,
        email: user.email,
        username: user.username
    })
})

//Profile
export const profileUser = asyncHandler(async (req, res) => {
    // The user ID is now available in req.user thanks to isAuthenticated middleware
    const userId = req.user

    // Find the user
    const user = await User.findById(userId).select("-password")
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }

    // Send the response
    res.status(200).json({
        id: user._id,
        username: user.username,
        email: user.email,
    })
})

// Update Password
export const UpdatePassword = asyncHandler(async(req,res) => {
    //New password
    const {newPassword} = req.body
    //Find the user
    const user = await User.findById(req.user)
    if(!user){
        throw new Error("User not found")
    }
    // hash the new password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword
    //save
    await user.save()
    //send response
    res.status(201).json({message:"Password updated successfully"})
})

//Update user profile
export const updateUserProfile = asyncHandler(async(req,res) => {
    const { email, username } = req.body
    const updatedUser = await User.findByIdAndUpdate(
        req.user,
        {
            username,
            email,
        },
        {
            new: true,
        }
    ).select('-password')

    if (!updatedUser) {
        res.status(404)
        throw new Error("User not found")
    }

    res.status(200).json({ 
        message: "User profile updated successfully", 
        user: updatedUser 
    })
})