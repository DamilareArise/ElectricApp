const mongoose = require('mongoose')

const userRegSchema = mongoose.Schema({
    firstName: {type:String, require:true},
    lastName: {type:String, require:true},
    email: {type:String, require:true, unique:true},
    password: {type:String, require:true},
    phone: {type:String, require:true},
    date: {type:Date, default:Date.now}
})

let userRegModel = mongoose.model('account_collection', userRegSchema)
module.exports = userRegModel