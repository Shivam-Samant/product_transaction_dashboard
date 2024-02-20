const express = require('express')
const { getAllTransactions } = require('../controllers/transactionController')

const transactionRouter = express.Router()

transactionRouter.get('/', getAllTransactions)

module.exports = transactionRouter
