const Product = require('../models/productModel')

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
        ]
      }
    }
  }

  if (month) {
    query.$expr = { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
  }

  const totalCountPromise = Product.countDocuments(query)
  const transactionsPromise = Product.find(query)
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


// try {
//   const { page = 1, perPage = 10, search = '' } = req.query;

//   let query = {};
//   if (search) {
//     if (!isNaN(search)) {
//       // Search in the price column if the search input is a number
//       query = { price: parseFloat(search) };
//     } else {
//       // Search in the title and description columns if the search input is not a number
//       query = {
//         $or: [
//           { title: { $regex: search, $options: 'i' } },
