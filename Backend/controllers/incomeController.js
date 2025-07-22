const xlsx = require('xlsx')
const fs = require("fs");
const Income = require('../models/income')

exports.addIncome = async(req, res)=>{
    const userId = req.user.id
    try {
        const {icon, source, amount, date} = req.body
        if(!source || !amount || !date){
            return res.status(400).json({success: false, message: "All fields are required!"})
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })
        await newIncome.save()

        res.status(200).json({
            success: true,
            newIncome,
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

exports.getAllIncome = async(req, res)=>{
    const userId = req.user.id
    try {
        const income = await Income.find({userId}).sort({date: -1})
        res.status(200).json({
            success: true,
            income
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        })
    }
}

exports.deleteIncome = async(req, res)=>{
    const id = req.params.id

    try {
        const result = await Income.deleteOne({_id: id})
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

exports.downloadExcelIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.find({ userId }).sort({ date: -1 });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income");

        // Fix: write file synchronously to ensure it's saved before downloading
        const filePath = "income_details.xlsx";
        xlsx.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

