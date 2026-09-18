import "./DeliveryChart.css";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#818263",
  "#C2C395",
  "#DDBAAE",
  "#EFD7CF",
  "#DCD4C1",
  "#F6EAD4",
];

const DeliveryChart = ({ data }) => {
  const chartData = data.map((item) => ({
    name: item._id,
    value: item.total,
  }));

  return (
    <div className="chart-card">

      <div className="chart-header">
        <h2>Delivery Status</h2>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <PieChart>

          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default DeliveryChart;