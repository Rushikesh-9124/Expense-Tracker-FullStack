const mongoose = require('mongoose')
const Schema = mongoose.Schema

const incomeSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref:"User", required: true},
    icon: {type: String},
    source: {type: String, required: true},
    amount: {type: Number, require: true},
    date: {type: Date, default: () => new Date()}
}, {timeStamps: true})

module.exports = mongoose.model("Income", incomeSchema)