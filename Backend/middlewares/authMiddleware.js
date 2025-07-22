const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const protect = async (req, res, next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Token not found!"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

module.exports = protect