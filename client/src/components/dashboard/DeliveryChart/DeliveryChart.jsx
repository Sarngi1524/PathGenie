import "./DeliveryChart.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function DeliveryChart({ data = [] }) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Create 12 months with default value 0
  const monthlyData = new Array(12).fill(0);

  // Fill data from API
  data.forEach((item) => {
    monthlyData[item._id - 1] = item.totalDeliveries;
  });

  const chartData = {
    labels: months,

    datasets: [
      {
        label: "Deliveries",

        data: monthlyData,

        borderColor: "#818263",

        backgroundColor: "rgba(129,130,99,0.15)",

        fill: true,

        tension: 0.4,

        borderWidth: 3,

        pointRadius: 5,

        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      intersect: false,
      mode: "index",
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#333",
        bodyColor: "#333",
        borderColor: "#818263",
        borderWidth: 1,
        padding: 12,
      },
    },

    scales: {
      y: {
        beginAtZero: true,

        ticks: {
          stepSize: 1,
        },

        grid: {
          color: "#ececec",
        },
      },

      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="chart-card">
      <h3>Monthly Deliveries</h3>

      <div className="chart-container">
        <Line
          data={chartData}
          options={options}
        />
      </div>
    </div>
  );
}