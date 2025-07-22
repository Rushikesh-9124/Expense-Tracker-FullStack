const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const incomeRoutes = require('./routes/incomeRoutes')
const expenseRoutes =  require('./routes/expenseRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const protect = require('./middlewares/authMiddleware')

const User = require('./models/user.model')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

connectDB()
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/income', incomeRoutes)
app.use('/api/v1/expense', expenseRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)

app.get('/', (req, res)=>{
    res.status(200).json({success:true, message: "API Working!"})
})

app.get('/get-user', protect, async(req, res)=> {
    const id = req.user.id
    try {
        const user = await User.findOne({_id:id})
        
        res.json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
})

app.listen(8000, ()=>{
    console.log('Server is listening on http://localhost:8000')
})