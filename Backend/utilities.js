// const jwt = require('jsonwebtoken')

// function authenticateToken (req, res, next){
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(" ")[1]
//     if(!token) return res.status(401).json({success:false, message: "No Token Provided!"})

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
//         if(err) return res.status(403).json({success:false, message:"Invalid or Expired Token!"})
//         req.user = user
//         next()
//     })
// }

// module.exports = {
//     authenticateToken
// }