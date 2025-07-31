import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { YearlySales } from "../types/sales";
import { Context } from "vm";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6B6B",
];

interface PieChartComponentProps {
  data: YearlySales[];
  selectedYear: number;
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({
  data,
  selectedYear,
}) => {
  // Safely get year data with fallback
  const yearData = React.useMemo(() => {
    try {
      const yearEntry = data?.find((item) => item.year === selectedYear);
      return yearEntry?.data ? [...yearEntry.data] : [];
    } catch (error) {
      console.error("Error processing chart data:", error);
      return [];
    }
  }, [data, selectedYear]);

  // Calculate total sales with error handling
  const totalSales = React.useMemo(() => {
    try {
      return yearData?.reduce((sum, item) => sum + (item?.sales || 0), 0) || 0;
    } catch (error) {
      console.error("Error calculating total sales:", error);
      return 0;
    }
  }, [yearData]);

  // Type-safe label renderer
  const renderCustomizedLabel = (props: Context) => {
    try {
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        name,
        value,
      } = props;
      const RADIAN = Math.PI / 180;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xs font-medium"
        >
          {`${name}: $${value?.toLocaleString?.() || "0"} (${(
            percent * 100
          )?.toFixed(0)}%)`}
        </text>
      );
    } catch (error) {
      console.error("Error rendering label:", error);
      return null;
    }
  };

  // Fallback for empty data
  if (!yearData || yearData.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium">No data available</p>
          <p className="text-sm">for {selectedYear}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={yearData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={120}
            fill="#8884d8"
            dataKey="sales"
            nameKey="month"
            label={renderCustomizedLabel}
          >
            {yearData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `$${(value || 0).toLocaleString()}`,
              `${name} (${
                totalSales > 0
                  ? ((Number(value) / totalSales) * 100).toFixed(1)
                  : 0
              }%)`,
            ]}
            contentStyle={{
              backgroundColor: "#1e293b",
              borderColor: "#334155",
              borderRadius: "0.5rem",
              color: "#f8fafc",
            }}
          />
          <Legend
            formatter={(value, entry, index) => (
              <span className="text-sm text-gray-600">
                {value} (${yearData[index]?.sales?.toLocaleString?.() || "0"})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
