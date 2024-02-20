const Product = require('../models/productModel')

async function initializeDatabaseWithSeedData(apiUrl) {
  try {
    const response = await fetch(apiUrl)
    const seedData = await response.json()

    await Product.insertMany(seedData)
  } catch (error) {
    throw new Error(`Error initializing database: ${error.message}`)
  }
}

module.exports = {
  initializeDatabaseWithSeedData,
}
