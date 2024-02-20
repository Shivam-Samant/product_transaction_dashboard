const ProductTransaction = require('../models/productTransactionModel')

async function initializeDatabaseWithSeedData(apiUrl) {
  try {
    console.log({apiUrl})
    const response = await fetch(apiUrl)
    console.log({response})
    const seedData = await response.json()
    console.log({
      seedData
    })

    await ProductTransaction.insertMany(seedData)
  } catch (error) {
    throw new Error(`Error initializing database: ${error.message}`)
  }
}

module.exports = {
  initializeDatabaseWithSeedData,
}
