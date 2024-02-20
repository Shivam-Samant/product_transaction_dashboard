const ProductTransaction = require('../models/productTransactionModel')

async function getAllTransactions(searchText, month, page, perPage) {
  let query = {}

  if (searchText) {
    const digit = parseFloat(searchText)

    if (!isNaN(digit)) {
      query = { price: digit }
    } else {
      query = {
        $or: [
          { title: { $regex: searchText, $options: 'i' } },
          { description: { $regex: searchText, $options: 'i' } },
        ],
      }
    }
  }

  if (month) {
    query.$expr = { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
  }

  const totalCountPromise = ProductTransaction.countDocuments(query)
  const transactionsPromise = ProductTransaction.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage)

  const [totalCount, transactions] = await Promise.all([
    totalCountPromise,
    transactionsPromise,
  ])

  return { totalCount, transactions }
}

module.exports = {
  getAllTransactions,
}
