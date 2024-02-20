import { axios } from '../utils'

export const getMonthlyData = async (month) => {
  try {
    const response = await axios.get('/statistics/monthly', {
      params: {
        month: month,
      },
    })
    return response.data
  } catch (err) {
    throw err
  }
}

export const getBarChartData = async (month) => {
  try {
    const response = await axios.get(`/statistics/bar-chart/${month}`)
    return response.data
  } catch (err) {
    throw err
  }
}

export const getPieChartData = async (month) => {
  try {
    const response = await axios.get(`/statistics/pie-chart/${month}`)
    return response.data
  } catch (err) {
    throw err
  }
}
