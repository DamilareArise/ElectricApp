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

const logTransaction = (req, res) => {
    const { userId, customerName, meterNo, amount, token, category, successful, refrenceId } = req.body;
    
    const transaction = new transactionModel({
        userId: userId,
        customerName: customerName,
        meterNo: meterNo,
        amount: amount,
        token: token,
        category: category,
        successful: successful,
        refrenceId: refrenceId
    });
    
    transaction.save()
    .then((data) => {
        // Prepare nodemailer configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USERNAME,
                pass: process.env.GMAIL_PASSWORD
            }
        });
        
        // If the transaction is successful, send a success email
        if (successful === true) {
            let successMailHTML = successmail.replace('[User\'s Name]', data.customerName)
                                             .replace('[Electric Token]', token); // Assuming 'token' is the electric token
            
            let mailOptions = {
                from: 'electricbytpw@gmail.com',
                to: [data.email, 'electricbytpw@gmail.com'],
                subject: 'Transaction Successful',
                html: successMailHTML
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error sending success email: ', error);
                } else {
                    console.log('Success email sent: ' + info.response);
                }
            });
        } 
        // If the transaction failed, send a failure email
        else {
            let failedMailHTML = failedmail.replace('[User\'s Name]', data.customerName);

            let mailOptions = {
                from: 'electricbytpw@gmail.com',
                to: [data.email, 'electricbytpw@gmail.com'],
                subject: 'Transaction Failed',
                html: failedMailHTML
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error sending failure email: ', error);
                } else {
                    console.log('Failure email sent: ' + info.response);
                }
            });
        }

        // Respond to the request after email is sent
        res.send({ status: true, details: data });
    })
    .catch((err) => {
        res.send({ status: false, message: err.message });
    });
};


module.exports = {
    allTransaction,
    logTransaction
}