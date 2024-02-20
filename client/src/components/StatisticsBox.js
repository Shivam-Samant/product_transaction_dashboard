import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'

const StatisticsBox = ({ statisticsData }) => {
  return (
    <Grid container spacing={4}>
      <Grid item sm={3}>
        <Card>
          <CardContent sx={{ color: '#00302d' }}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Total Sale Amount
            </Typography>
            <Typography variant="h5" component="div">
              ₹ {statisticsData?.totalSaleAmount.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item sm={3}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Total Sold Items
            </Typography>
            <Typography variant="h5" component="div">
              {statisticsData?.totalSoldItems}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item sm={3}>
        <Card>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Total UnSold Items
            </Typography>
            <Typography variant="h5" component="div">
              {statisticsData?.totalUnSoldItems}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default StatisticsBox
