import React, { useEffect, useState } from 'react';
import { BarChart as Chart } from '@mui/x-charts';

const BarChart = ({ barChartData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (barChartData) {
      const transformedData = barChartData.map(data => ({
        range: data.range,
        count: data.count,
      }));
      setChartData(transformedData);
    }
  }, [barChartData]);

  if (!chartData || chartData.length === 0) {
    return null
  }

  return (
    <Chart
      dataset={chartData}
      series={[{ dataKey: 'count' }]}
      height={290}
      xAxis={[{ dataKey: 'range', scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
};

export default BarChart;
