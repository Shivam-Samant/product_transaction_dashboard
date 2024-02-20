const express = require('express')
const { initProducts } = require('../controllers/productController')

const productRouter = express.Router()

productRouter.get('/init', initProducts)

module.exports = productRouter
