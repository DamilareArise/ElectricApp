const express = require('express')
const transactionModel = require('../models/transaction.model')
const successmail = require('../successmail')
const failedmail = require('../failedmail')



const allTransaction = (req, res) => {
    let id = req.params.id
    transactionModel.find({userId:id})
    .then((data) => {
        res.send({transactions:data, status:true})
    })
    .catch((err) => {
        console.log('Error: ',err);
        res.send({message:'An error occurred', status:false})
    })
}

const logTransaction  = (req, res) =>{
    const {userId, customerName, meterNo, amount, token, category,successful, refrenceId} = req.body
    const transaction = new transactionModel({
        userId:userId,
        customerName:customerName,
        meterNo:meterNo,
        amount:amount,
        token:token,
        category:category,
        successful:successful,
        refrenceId:refrenceId
    })
    transaction.save()
    .then((data) => {
        if(successful == true){
                let successmail = successmail
                .replace('[User\'s Name]', data.firstName)
        
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD
                    }
                });
                let mailOptions = {
                    from: 'electricbytpw@gmail.com',
                    to: [data.email, 'electricbytpw@gmail.com'],
                    subject: 'Transaction successful',
                    html: successmail
                };
            
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
            }else{
                let failedmail = failedmail
                .replace('[User\'s Name]', data.firstName)
                .replace('[Electric Token]', data.electricToken);

                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD
                    }
                });
                let mailOptions = {
                    from: 'electricbytpw@gmail.com',
                    to: [data.email, 'electricbytpw@gmail.com'],
                    subject: 'Transaction successful',
                    html: failedmail
                };
            
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email sent: ' + info.response);
                    }
                });
            }
          res.send({ status: true, details: data })
        })
        .catch((err) => {
          res.send({ status: false, message: err.message })
        })
        res.send({message:'Transaction logged successfully', status:true})
    
    .catch((err) => {
        console.log('Error: ',err);
        res.send({message:'An error occurred', status:false})
    })
}

module.exports = {
    allTransaction,
    logTransaction
}