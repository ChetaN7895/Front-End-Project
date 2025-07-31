import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { YearlySales } from '@/types/sales';

interface LineChartComponentProps {
  data: YearlySales[];
  selectedYear: number;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({ data, selectedYear }) => {
  const yearData = data.find((item) => item.year === selectedYear)?.data || [];

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={yearData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} name="Sales" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};