const transactionService = require('../services/transactionService')
const constants = require('../utils/constants')

async function getAllTransactions(req, res) {
  try {
    const {
      searchText='',
      month,
      page = constants.DEFAULT_PAGE,
      perPage = constants.DEFAULT_PER_PAGE,
    } = req.query

    const transactions = await transactionService.getAllTransactions(
      searchText,
      month,
      parseInt(page),
      parseInt(perPage),
    )

    res.status(200).json({ data: transactions })
  } catch (error) {
    console.error(`Error handling request: ${error.message}`)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

module.exports = {
  getAllTransactions,
}
