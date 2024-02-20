import React, { useEffect, useState } from 'react'
import { PieChart as Chart } from '@mui/x-charts'

const PieChart = ({ pieChartData }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (pieChartData) {
      const transformedData = pieChartData.map((data, idx) => ({
        id: idx,
        value: data.count,
        label: data.category
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
      }))
      setChartData(transformedData)
    }
  }, [pieChartData])

  if (!chartData || chartData.length === 0) {
    return null
  }

  return (
    <Chart
      series={[
        {
          data: chartData,
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 150,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          arcLabel: (item) => item.value,
          arcLabelMinAngle: 45,
        },
      ]}
      width={500}
      height={400}
    />
  )
}

export default PieChart
