import React, { useState, useEffect } from 'react'
import { transactionApi, statisticsApi } from '../apis'
import { TransactionList, StatisticsBox, BarChart } from '../components'
import { Container, Typography, Box } from '@mui/material'

const Home = () => {
  const [transactionData, setTransactionData] = useState([])
  const [month, setMonth] = useState(3) // Default to March
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10) // Default per page to 10
  const [statisticsData, setStatisticsData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTransactionsData = async () => {
      try {
        setIsLoading(true)
        const response = await transactionApi.getAll(month, searchText, page, perPage)
        setTransactionData(response?.data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTransactionsData()
  }, [month, searchText, page, perPage])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statisticsResponse, barChartResponse] = await Promise.all([
          statisticsApi.getMonthlyData(month),
          statisticsApi.getBarChartData(month),
        ]);

        setStatisticsData(statisticsResponse.data);
        setBarChartData(barChartResponse.data);
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [month])

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2, color: "#00302d" }}>
          Transaction Dashboard
        </Typography>

        <img
          src="https://roxiler.com/wp-content/uploads/2022/03/Mask-Group-14.svg"
          alt="Roxiler"
          style={{ position: 'absolute', right: 0, bottom: 0 }}
          width={100}
          height={150}
        />

        <TransactionList
          transactionData={transactionData}
          month={month}
          searchText={searchText}
          page={page}
          setPage={setPage}
          setSearchText={setSearchText}
          setMonth={setMonth}
          perPage={perPage}
          setPerPage={setPerPage}
          isLoading={isLoading}
        />

        {Object.keys(statisticsData || {})?.length && (
          <Box sx={{ my: 8 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 4, color: "#00302d" }}
            >
              Transaction Statistics
            </Typography>
            <StatisticsBox statisticsData={statisticsData} />
          </Box>
        )}

        {barChartData?.length > 0 && (
          <Box sx={{ my: 8 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 4, color: "#00302d" }}
            >
              Transaction Bar Chart
            </Typography>
            <BarChart barChartData={barChartData} />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Home
