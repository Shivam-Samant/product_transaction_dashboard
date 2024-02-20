import React, { useState, useEffect } from 'react'
import { transactionApi, statisticsApi } from '../apis'
import {
  TransactionList,
  StatisticsBox,
  BarChart,
  PieChart,
} from '../components'
import { Container, Typography, Box } from '@mui/material'
import constants from '../utils/constants'

const Home = () => {
  const [transactionData, setTransactionData] = useState([])
  const [month, setMonth] = useState(3) // Default to March
  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10) // Default per page to 10
  const [statisticsData, setStatisticsData] = useState([])
  const [barChartData, setBarChartData] = useState([])
  const [pieChartData, setPieChartData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchTransactionsData = async () => {
      try {
        setIsLoading(true)
        const response = await transactionApi.getAll(
          month,
          searchText,
          page,
          perPage,
        )
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
        const [statisticsResponse, barChartResponse, pieChartDataResponse] =
          await Promise.all([
            statisticsApi.getMonthlyData(month),
            statisticsApi.getBarChartData(month),
            statisticsApi.getPieChartData(month),
          ])

        setStatisticsData(statisticsResponse.data)
        setBarChartData(barChartResponse.data)
        setPieChartData(pieChartDataResponse.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [month])

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: -4,
            background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
          }}
        >
          <Typography
            variant="h4"
            component="h4"
            sx={{
              color: '#fff',
              textAlign: 'center',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              py: 4,
            }}
          >
            Transaction Dashboard
          </Typography>
        </Box>

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

        {Object.keys(statisticsData || {})?.length > 0 && (
          <Box sx={{ my: 8 }}>
            <Typography
              variant="h4"
              component="h1"
              sx={{ mb: 4, color: '#00302d' }}
            >
              Statistics - {constants.MONTH_NAMES[month-1]}
            </Typography>
            <StatisticsBox statisticsData={statisticsData} />
          </Box>
        )}

        {barChartData?.length > 0 && (
          <Box sx={{ my: 8 }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component="span"
                sx={{ color: '#00302d' }}
              >
                Bar Chart Stats - {constants.MONTH_NAMES[month-1]}
              </Typography>
              <Typography
                variant="h5"
                component="span"
                sx={{ ml: 2, color: '#00302d' }}
              >
                (Total products within each price range)
              </Typography>
            </Box>
            <BarChart barChartData={barChartData} />
          </Box>
        )}

        {pieChartData?.length > 0 && (
          <Box sx={{ my: 8 }}>
            <Typography
              variant="h4"
              component="span"
              sx={{ mb: 4, color: '#00302d' }}
            >
              Pie Chart Stats - {constants.MONTH_NAMES[month-1]}
            </Typography>
            <Typography
              variant="h5"
              component="span"
              sx={{ ml: 2, color: '#00302d' }}
            >
              (Total products within each category)
            </Typography>
            <PieChart pieChartData={pieChartData} />
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Home
