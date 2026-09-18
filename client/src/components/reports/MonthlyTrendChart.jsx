import "./MonthlyTrendChart.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const MONTHS = [
  "",
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

const MonthlyTrendChart = ({ data }) => {
  const chartData = data.map((item) => ({
    month: MONTHS[item._id],
    deliveries: item.total,
  }));

  return (
    <div className="chart-card">

      <div className="chart-header">
        <h2>Monthly Delivery Trend</h2>
      </div>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="deliveries"
            stroke="#818263"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default MonthlyTrendChart;