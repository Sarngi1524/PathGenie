import "./VehicleChart.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VehicleChart = ({ data }) => {
  const chartData = data.map((item) => ({
    type: item._id,
    total: item.total,
  }));

  return (
    <div className="chart-card">

      <div className="chart-header">
        <h2>Vehicle Distribution</h2>
      </div>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={chartData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="type" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="total"
            fill="#818263"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
};

export default VehicleChart;