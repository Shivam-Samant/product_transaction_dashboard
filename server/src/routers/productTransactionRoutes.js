const express = require('express')
const { initProducts } = require('../controllers/productTransactionController')

const productTransactionRouter = express.Router()

productTransactionRouter.get('/init', initProducts)

module.exports = productTransactionRouter
