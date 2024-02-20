const express = require('express')

const router = express.Router()
const productRouter = require('./productRoutes')
const transactionRouter = require('./transactionRoutes')
const statisticsRouter = require('./statisticsRoutes')

router.use('/products', productRouter)
router.use('/transactions', transactionRouter)
router.use('/statistics', statisticsRouter)

module.exports = router
