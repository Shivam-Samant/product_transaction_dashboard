const express = require('express')
const {
  getMonthlyStatistics,
  getBarChartData,
  getPieChartData,
  getAllStatistics,
} = require('../controllers/statisticsController')

const statisticRouter = express.Router()

statisticRouter.get('/monthly', getMonthlyStatistics)
statisticRouter.get('/bar-chart/:month', getBarChartData)
statisticRouter.get('/pie-chart/:month', getPieChartData)
statisticRouter.get('/all/:month', getAllStatistics)

module.exports = statisticRouter
