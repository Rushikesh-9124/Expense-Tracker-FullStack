const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    icon: {type:String},
    category: {type:String, required: true},
    amount: {type: Number, required: true},
    date: {type: Date, default: ()=> new Date()}
}, {timeseries: true})

module.exports = mongoose.model("Expense", expenseSchema)