const express = require("express")
const {
    addExpense, 
    getAllExpense,
    deleteExpense,
    downloadExcelExpense
} = require('../controllers/expenseController')
const protect = require("../middlewares/authMiddleware")
const router = express.Router()

router.post('/add', protect, addExpense)
router.get('/get', protect, getAllExpense)
router.get('/downloadExcel', protect, downloadExcelExpense)
router.delete('/deleteExpense/:id', protect, deleteExpense)

module.exports = router