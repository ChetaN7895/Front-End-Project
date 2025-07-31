import React from 'react';
import { Button } from '../atoms/Button';
import { ChartType } from '../types/sales';

interface ChartSelectorProps {
  activeChart: ChartType;
  onChange: (chartType: ChartType) => void;
}

export const ChartSelector: React.FC<ChartSelectorProps> = ({ activeChart, onChange }) => {
  const charts: { type: ChartType; label: string }[] = [
    { type: 'bar', label: 'Bar Chart' },
    { type: 'line', label: 'Line Chart' },
    { type: 'pie', label: 'Pie Chart' },
  ];

  return (
    <div className="flex gap-2">
      {charts.map((chart) => (
        <Button
          key={chart.type}
          variant={activeChart === chart.type ? 'primary' : 'secondary'}
          onClick={() => onChange(chart.type)}
        >
          {chart.label}
        </Button>
      ))}
    </div>
  );
};