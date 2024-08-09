const express = require('express')
const router = express.Router()
const {homePage} = require('../controllers/user.controller')


router.get('/', homePage)

module.exports = router