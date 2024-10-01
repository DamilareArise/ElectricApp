const express = require('express')
const { registration, authenticateUser, getDashboard, forgotPassword, resetPasswordWithToken } = require('../controllers/user.controller')
const router = express.Router()

router.post('/registration',registration)
router.post('/signin', authenticateUser)
router.get('/dashboard', getDashboard) 
router.post('/forgot-password', forgotPassword) 
router.post('/reset-password', resetPasswordWithToken) 


module.exports = router