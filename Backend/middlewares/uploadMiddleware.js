const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')
const cloudinary = require('../utils/cloudinary')

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile_pics',
        allowed_formats: ['jpg','png', 'jpeg', 'webp']
    }
})



const upload = multer({storage})
module.exports = upload

// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cf(null, 'uploads/')
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpg', 'image/png', 'image/jpeg', 'image/webp']
//     if(allowedTypes.includes(file.mimeytype)){
//         cb(null, true)
//     }
//     else{
//         cb(new Error('only .jpg, .png, .jpeg and .webp formats are allowed!'), false)
//     }
// }

// const upload = multer({storage, fileFilter})

// module.exports = upload