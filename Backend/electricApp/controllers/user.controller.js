const express = require('express')
const userRegModel = require('../models/user.model')
const nodemailer = require("nodemailer");
const mailHTML = require('../mail');
const jwt = require('jsonwebtoken')
const resetPasswordMailHTML = require('../resetPassword')


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
        from: process.env.GMAIL_USERNAME,
        to: [data.email, process.env.GMAIL_USERNAME],
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



const forgotPassword = (req, res) => {
  const { email } = req.body;

  try {
    userRegModel.findOne({ email })
      .then((data) => {

        if (!data) {
          res.send({ status: false, message: 'User not found' })
        }
        else {
          const token = jwt.sign({ userId: data._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
          let transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.GMAIL_USERNAME,
              pass: process.env.GMAIL_PASSWORD
            }
          });

          let resetLink = `https://electric-app-seven.vercel.app/reset-password/${token}`
          let resetMailHTML = resetPasswordMailHTML
          .replace('[User\'s Name]', data.firstName)
          .replace('[Reset Link]', resetLink);

          const mailOptions = {
            from: process.env.GMAIL_USERNAME,
            to: data.email,
            subject: 'Reset Password',
            html: resetMailHTML
          }; 
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
              return res.send({ status: false, message: error.message })
            }
            res.send({ status: true, message: 'Password reset link sent to your email', token })
          })
        }
      })
      .catch((err) => {
        res.send({ status: false, message: err.message })
      })
  }
  catch (err) {
    res.send({ status: false, message: 'err.message2' })
  }
}


const resetPasswordWithToken = (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    // Find the user by the userId in the token
    userRegModel.findById(userId)
      .then((user) => {
        if (!user) {
          return res.send({ status: false, message: 'Invalid or expired token' });
        }
        // Update the user's password
        user.password = newPassword;
        user.save()
          .then(() => {
            res.send({ status: true, message: 'Password updated successfully' })
          })
          .catch((err) => {
            res.send({ status: false, message: err.message })
          })
      })
      .catch((err) => {
        res.send({ status: false, message: err.message })
      })
  }
  catch (err) {
    res.send({ status: false, message: 'Invalid or expired token' })
  }
}




module.exports = { registration, authenticateUser, getDashboard, forgotPassword, resetPasswordWithToken }