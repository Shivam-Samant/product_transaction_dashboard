const Product = require('../models/productModel')

async function getMonthlyStatistics(month) {
  const [totalSaleAmountResult, totalSoldItems, totalUnSoldItems] =
    await Promise.all([
      Product.aggregate([
        {
          $match: {
            $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] },
            sold: true,
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$price' },
          },
        },
      ]),
      Product.countDocuments({
        $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
        sold: true,
      }),
      Product.countDocuments({
        $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
        sold: false,
      }),
    ])

  const totalSaleAmount =
    totalSaleAmountResult.length > 0 ? totalSaleAmountResult[0].totalAmount : 0

  return { totalSaleAmount, totalSoldItems, totalUnSoldItems }
}

async function getBarChartData(month) {
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity },
  ]

  const barChartData = await Promise.all(
    priceRanges.map(async ({ min, max }) => {
      const count = await Product.countDocuments({
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, month],
        },
        price: { $gte: min, $lte: max },
      })
      range = max == Infinity ? '901 - above' : `${min}-${max}`
      return { range, count }
    }),
  )

  return barChartData
}

async function getPieChartData(month) {
  const pieChartData = await Product.aggregate([
    {
      $match: {
        $expr: { $eq: [{ $month: '$dateOfSale' }, month] },
      },
    },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        category: '$_id',
        count: 1,
        _id: 0,
      },
    },
  ])

  return pieChartData
}

async function getAllStatistics(month) {
  const statisticsData = await getMonthlyStatistics(month)
  const barChartData = await getBarChartData(month)
  const pieChartData = await getPieChartData(month)

  return {
    statisticsData,
    barChartData,
    pieChartData,
  }
}

module.exports = {
  getMonthlyStatistics,
  getBarChartData,
  getPieChartData,
  getAllStatistics,
}
