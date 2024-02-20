const statisticsService = require('../services/statisticsService');

async function getMonthlyStatistics(req, res) {
  try {
    const { month } = req.query;
    const statistics = await statisticsService.getMonthlyStatistics(month);
    res.status(200).json({data: statistics});
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getBarChartData(req, res) {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const { month = currentMonth } = req.params;

    const barChartData = await statisticsService.getBarChartData(parseInt(month));
    res.json({ data: barChartData });
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getPieChartData(req, res) {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const { month = currentMonth } = req.params;

    const pieChartData = await statisticsService.getPieChartData(parseInt(month));
    res.json({ data: pieChartData });
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllStatistics(req, res) {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const { month = currentMonth } = req.params;

    const statistics = await statisticsService.getAllStatistics(parseInt(month));
    res.json(statistics);
  } catch (error) {
    console.error(`Error handling request: ${error.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getMonthlyStatistics,
  getBarChartData,
  getPieChartData,
  getAllStatistics,
};
