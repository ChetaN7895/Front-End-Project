import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { YearlySales } from '@/types/sales';

interface BarChartComponentProps {
  data: YearlySales[];
  selectedYear: number;
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({ data, selectedYear }) => {
  const yearData = data.find((item) => item.year === selectedYear)?.data || [];

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <Bar dataKey="sales" fill="#8884d8" name="Sales" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};