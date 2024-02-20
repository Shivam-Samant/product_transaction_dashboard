import React, { useEffect, useState } from 'react';
import { PieChart as Chart } from '@mui/x-charts';

const PieChart = ({ pieChartData }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (pieChartData) {
      const transformedData = pieChartData.map(data => ({
        range: data.range,
        count: data.count,
      }));
      setChartData(transformedData);
    }
  }, [pieChartData]);

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

export default PieChart;
