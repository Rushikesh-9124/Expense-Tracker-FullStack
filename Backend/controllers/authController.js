const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const generateToken = (id) => {
    return jwt.sign(
        {id},
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : "3600m"}
    )
}

const registerUser =  async(req, res) => {
    const {fullName, email, password} = req.body

    if(!fullName || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required!"
        })
    }
    // if(!req.file){
    //     res.status(200).json({success: false, message: "Image not provided!"})
    // }
    try {
        const isUser = await User.findOne({email})
        if(isUser){
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            })
        }
        
        const profileImageUrl = req.file?.path

        const user = new User({
            fullName,
            email,
            password,
            profileImageUrl
        })
        await user.save()
        res.status(201).json({
            success: true,
            data: {
                _id: user._id,
                fullName: user.fullName,
                accessToken: generateToken(user._id),
                profileImageUrl
            },
            message: "Successfully Registered!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }

}

const loginUser = async(req, res)=> {
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields required!"
        })
    }
    try {
        const user = await User.findOne({email})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials!"
            })
        }

        res.status(200).json({
            success: true,
            data: user,
            accessToken: generateToken(user._id),
            message: "Successfully LoggedIn!"

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

const getUserInfo = async(req, res) => {
    const user = req.user
    try {
        const userInfo = await User.findById(user._id).select("-password")
        if(!userInfo){
            return res.status(404).json({
                success: false,
                message: "User not found!"
            })
        }
        res.status(200).json({
            success: true,
            user: user,
            message:"Successfully fetched user info!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUserInfo
}