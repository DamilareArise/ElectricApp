const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    userId: {type: String, require: true},
    customerName: {type: String, require: true},
    meterNo: {type: String, require: true},
    amount: {type: Number, require: true},
    token: {type: String, require: true},
    category: {type: String, require: true},
    date: { type: Date, default: Date.now },
    refrenceId: {type: String, require: true}
})