const express = require("express")
const {
    addIncome, 
    getAllIncome,
    deleteIncome,
    downloadExcelIncome
} = require('../controllers/incomeController')
const protect = require("../middlewares/authMiddleware")
const router = express.Router()

router.post('/add', protect, addIncome)
router.get('/get', protect, getAllIncome)
router.get('/downloadExcel', protect, downloadExcelIncome)
router.delete('/deleteIncome/:id', protect, deleteIncome)

module.exports = router