const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    userId: {type: String, require: true},
    customerName: {type: String, require: true},
    meterNo: {type: String, require: true},
    amount: {type: Number, require: true},
    token: {type: String},
    category: {type: String, require: true},
    refrenceId: {type: String, require: true},
    date: { type: Date, default: Date.now }
})

let transactionModel = mongoose.model('transaction_collection', transactionSchema)
module.exports = transactionModel

