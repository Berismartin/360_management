import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SubscriberChart = ({ data }) => {
  // Define chart data
  const chartData = {
    labels: data.map((item) => item.label), // Categories or time periods
    datasets: [
      {
        label: 'Subscribers',
        data: data.map((item) => item.value), // Subscriber values
        backgroundColor: '#BF3B7D',
        borderColor: '#893F9A',
        borderWidth: 1,
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Subscriber Count',
      },
    },
  };

  return (
    <div className=" ">
      <Bar data={chartData} options={options}  />
    </div>
  );
};

export default SubscriberChart;
