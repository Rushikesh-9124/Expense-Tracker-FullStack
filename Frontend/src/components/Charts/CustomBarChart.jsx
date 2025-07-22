import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data, xKey = "category" }) => {
  const getBarColor = (idx) => (idx % 2 === 0 ? "#875cf5" : "#cfbefb");

  const CustomToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {item[xKey]}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ₹{item.amount}
            </span>
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 12, fill: "#555" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomToolTip />} />
          <Bar dataKey={"amount"} radius={[10, 10, 0, 0]}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={getBarColor(idx)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
