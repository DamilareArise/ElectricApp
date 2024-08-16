const express = require('express')
const userRegModel = require('../models/user.model')
const nodemailer = require("nodemailer");
const mailHTML = require('../mail');
const jwt = require('jsonwebtoken')


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
        to: [data.email, 'arisedamilare5@gmail.com'],
        subject: 'Welcome to ElectricityApp!',
        html: mailHTML.replace('[User\'s Name]', data.firstName)
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.send({ status: true, details: data })
    })
    .catch((err) => {
      res.send({ status: false, message: err.message })
    })
}

const authenticateUser = (req, res) => {
  userRegModel.findOne({ email: req.body.email })
    .then((data) => {
      if (data) {
        // valid email
        data.validatePassword(req.body.password, (err, isMatch) => {
          if (!isMatch) {
            // invalid password
            res.send({ status: false, message: 'Invalid Password' })
          } else {
            // valid password
            const token = jwt.sign({ userId: data._id }, process.env.SECRET_KEY,
              { expiresIn: '1h' }
            );
            res.send({ status: true, details: data, token })
          }
        })
      } else {
        // invalid email
        res.send({ status: false, message: 'User not found' })
      }

    })
    .catch((err) => {
      res.send({ status: false, message: err.message })
    })
}


const getDashboard = (req, res) => {
  let token = req.headers.authentication.split(" ")[1]
  // console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      res.send({ status: false, message: 'Invalid Token' })
    } else {
      console.log(decoded);
      userRegModel.findOne({ _id: decoded.userId })
        .then((data) => {
          res.send({ status: true, message: 'Valid Token', data })
        })
    }
  })
}

module.exports = { registration, authenticateUser, getDashboard }