import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types';

function ChartContainer({ data, chartConfig }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    // Validate data and chartConfig before proceeding
    if (data && Array.isArray(data) && data.length > 0) {
      try {
        // Create a new chart instance
        const chart = new Chart(ctx, {
          type: chartConfig.type,
          data: {
            labels: data.map((row) => row[chartConfig.xAxisLabel]),
            datasets: [
              {
                label: chartConfig.yAxisLabel,
                data: data.map((row) => row[chartConfig.yAxisLabel]),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        return () => chart.destroy();
      } catch (error) {
        console.error('Error creating chart:', error);
      }
    } else {
      console.warn('No valid data to display in chart');
    }
  }, [data, chartConfig]);

  return <canvas ref={chartRef} />;
}

ChartContainer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  chartConfig: PropTypes.shape({
    type: PropTypes.string.isRequired,
    xAxisLabel: PropTypes.string.isRequired,
    yAxisLabel: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChartContainer;
