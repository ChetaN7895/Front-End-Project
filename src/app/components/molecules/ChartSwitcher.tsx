import React from 'react';
import { Button } from '../atoms/Button';
import { ChartType } from '../types/sales';

interface ChartSwitcherProps {
  activeChart: ChartType;
  onChange: (chartType: ChartType) => void;
  className?: string;
}

const chartOptions = [
  { type: 'bar', label: 'Bar Chart' },
  { type: 'line', label: 'Line Chart' },
  { type: 'pie', label: 'Pie Chart' },
] as const;

export const ChartSwitcher: React.FC<ChartSwitcherProps> = ({ 
  activeChart, 
  onChange, 
  className = '' 
}) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {chartOptions.map((option) => (
        <Button
          key={option.type}
          variant={activeChart === option.type ? 'primary' : 'secondary'}
          onClick={() => onChange(option.type)}
          className="min-w-[100px]"
          aria-label={`Show ${option.label}`}
          aria-pressed={activeChart === option.type}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};