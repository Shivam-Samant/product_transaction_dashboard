const productService = require('../services/productService')

const initProducts = async (req, res) => {
  try {
    const apiUrl =
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json'
    await productService.initializeDatabaseWithSeedData(apiUrl)
    res.status(200).json({ message: 'Database initialized with seed data.' })
  } catch (error) {
    console.error(`Error handling request: ${error.message}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  initProducts,
}
