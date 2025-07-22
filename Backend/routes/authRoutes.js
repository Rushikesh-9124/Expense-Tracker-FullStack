const express = require('express')
const {registerUser, loginUser, getUserInfo} = require('../controllers/authController')
const router = express.Router()
const protect = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware.js')

router.post('/register', upload.single('image'), registerUser)
router.post('/login', loginUser)
router.get('/getUser',protect, getUserInfo)
router.post('/upload-image', upload.single('image'), async(req, res)=>{
    if(!req.file){
        res.status(400).json({success:false, message:"Image not found"})
    }
    const imageUrl = req.file?.path
    res.status(200).json({success: true, imageUrl:imageUrl})
})

module.exports = router