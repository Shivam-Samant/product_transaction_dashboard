const ProductTransaction = require('../models/productTransactionModel')

async function initializeDatabaseWithSeedData(apiUrl) {
  try {
    const response = await fetch(apiUrl)
    const seedData = await response.json()

    await ProductTransaction.insertMany(seedData)
  } catch (error) {
    throw new Error(`Error initializing database: ${error.message}`)
  }
}

module.exports = {
  initializeDatabaseWithSeedData,
}
