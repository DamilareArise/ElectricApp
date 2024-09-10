const express = require('express')
const transactionModel = require('../models/transaction.model')



const allTransaction = (req, res) => {
    let id = req.params.id
    transactionModel.findOne({userId:id})
    .then((data) => {
        res.send({transactions:data, status:true})
    })
    .catch((err) => {
        console.log('Error: ',err);
        res.send({message:'An error occurred', status:false})
    })
}

const logTransaction  = (req, res) =>{
    const {userId, customerName, meterNo, amount, token, category, refrenceId} = req.body
    const transaction = new transactionModel({
        userId:userId,
        customerName:customerName,
        meterNo:meterNo,
        amount:amount,
        token:token,
        category:category,
        refrenceId:refrenceId
    })
    transaction.save()
    .then((data) => {
        res.send({message:'Transaction logged successfully', status:true})
    })
    .catch((err) => {
        console.log('Error: ',err);
        res.send({message:'An error occurred', status:false})
    })
}

module.exports = {
    allTransaction,
    logTransaction
}