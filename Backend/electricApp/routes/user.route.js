const express = require('express')
const { registration, authenticateUser, getDashboard } = require('../controllers/user.controller')
const router = express.Router()

router.post('/registration',registration)
router.post('/signin', authenticateUser)
router.get('/dashboard', getDashboard)   


module.exports = router