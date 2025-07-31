import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { YearlySales } from '../types/sales';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28DFF', '#FF6B6B'];

interface PieChartComponentProps {
  data: YearlySales[];
  selectedYear: number;
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ 
  data, 
  selectedYear 
}) => {
  const yearData = data.find((item) => item.year === selectedYear)?.data || [];
  const totalSales = yearData.reduce((sum, item) => sum + item.sales, 0);

  // Custom label component
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    value
  }: any) => {
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
        {`${name}: $${value.toLocaleString()} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  };

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
              `$${value.toLocaleString()}`,
              `${name} (${((Number(value) / totalSales) * 100).toFixed(1)}%)`
            ]}
            contentStyle={{
              backgroundColor: '#1e293b',
              borderColor: '#334155',
              borderRadius: '0.5rem',
              color: '#f8fafc'
            }}
          />
          <Legend 
            formatter={(value, entry, index) => (
              <span className="text-sm text-gray-600">
                {value} (${yearData[index]?.sales.toLocaleString()})
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      {yearData.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No data available for {selectedYear}
        </div>
      )}
    </div>
  );
};
