const xlsx = require('xlsx')
const fs = require("fs");
const Expense = require('../models/expense')

exports.addExpense = async(req, res)=>{
    const userId = req.user.id
    try {
        const {icon, category, amount, date} = req.body
        if(!category || !amount || !date){
            return res.status(400).json({success: false, message: "All fields are required!"})
        }
        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        })
        await newExpense.save()

        res.status(200).json({
            success: true,
            newExpense,
            message: "Income added Successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error:error.message
        })
    }
}

exports.getAllExpense = async(req, res)=>{
    const userId = req.user.id
    try {
        const expense = await Expense.find({userId}).sort({date: -1})
        res.status(200).json({
            success: true,
            expense
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

exports.deleteExpense = async(req, res)=>{
    const id = req.params.id

    try {
        const result = await Expense.deleteOne({_id: id})
        if(result.deletedCount === 0){
            return res.status(400).json({success:false, message: "Unable to delete item!"})
        }
        res.status(200).json({
            success:true,
            message:"Successfully Deleted!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

exports.downloadExcelExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.find({ userId }).sort({ date: -1 });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");

        // Fix: write file synchronously to ensure it's saved before downloading
        const filePath = "expense_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

