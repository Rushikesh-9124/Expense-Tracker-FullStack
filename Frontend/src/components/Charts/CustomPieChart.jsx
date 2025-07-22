import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import customToolTip from "./customToolTip";
import customLegend from "./customLegend";
import { addThousandSeparator } from "../../utils/helper";

const CustomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380} >
      <PieChart>
        <Pie
          data={data}
          dataKey={"amount"}
          nameKey={"name"}
          cx={"50%"}
          cy={"50%"}
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
        <Tooltip content={customToolTip} />
        <Legend content={customLegend}/>
        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize={"14px"}
            >
              {label}
            </text>
            <text
              x="50%"
              y="50%"
              dy="8"
              textAnchor="middle"
              fill="#333"
              fontSize={"24px"}
              fontWeight={"semi-bold"}
            >
              &#8377;{addThousandSeparator(totalAmount)}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
