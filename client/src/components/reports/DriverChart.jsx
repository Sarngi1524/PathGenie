import "./DriverChart.css";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#22C55E",
  "#EF4444",
];

const DriverChart = ({ data }) => {

  const chartData = data.map((item)=>({
      name: item._id ? "Active" : "Inactive",
      value:item.total
  }));

  return (

    <div className="chart-card">

      <div className="chart-header">
        <h2>Driver Availability</h2>
      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={chartData}
            outerRadius={120}
            dataKey="value"
            label
          >

            {chartData.map((entry,index)=>(
              <Cell
                key={index}
                fill={COLORS[index]}
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

export default DriverChart;