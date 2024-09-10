const express = require('express')
const { allTransaction, logTransaction } = require('../controllers/transaction.controller')
const router = express.Router()

router.get('/all-transaction/:id', allTransaction)
router.post('/log-transaction', logTransaction)

module.exports = router