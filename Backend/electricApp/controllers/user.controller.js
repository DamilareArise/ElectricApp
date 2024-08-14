const express = require('express')
const userRegModel = require('../models/user.model')
const nodemailer = require("nodemailer");
const mailHTML = require('../mail');


const registration = (req, res) => {
    console.log(req.body);
    let form = userRegModel(req.body)
    form.save()
        .then((data) => {

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD
                }
            });
            let mailOptions = {
                from: 'arisedamilare5@gmail.com',
                to: data.email,
                subject: 'Welcome to ElectricityApp!',
                html: mailHTML.replace('[User\'s Name]', data.firstName)
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                }
              });
            res.send({status:true, details:data})
        })
        .catch((err) => {
            res.send({status:false, message: err.message })
        })
}


module.exports = { registration }