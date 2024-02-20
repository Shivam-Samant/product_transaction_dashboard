const Product = require('../models/productModel')

async function getAllTransactions(searchText, month, page, perPage) {
  const query = {}

  if (searchText) {
    const searchAsFloat = parseFloat(searchText)
    if (!isNaN(searchAsFloat)) {
      query.price = searchAsFloat
    }
    query.$or = [
      { title: { $regex: searchText, $options: 'i' } },
      { description: { $regex: searchText, $options: 'i' } },
    ]
  }

  if (month) {
    query.$expr = { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] };
  }
  const totalCount = await Product.countDocuments(query);

  const transactions = null

  console.log({
    totalCount, transactions
  })

  return { totalCount, transactions }
}

module.exports = {
  getAllTransactions,
}
