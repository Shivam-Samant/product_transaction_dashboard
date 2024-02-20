const express = require('express')

const router = express.Router()
const productTransactionRouter = require('./productTransactionRoutes')
const transactionRouter = require('./transactionRoutes')
const statisticsRouter = require('./statisticsRoutes')

router.use('/product-transactions', productTransactionRouter)
router.use('/transactions', transactionRouter)
router.use('/statistics', statisticsRouter)

module.exports = router
