import React from 'react';
import { Input } from '../atoms/Input';

interface FilterInputProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
  label?: string;
}

export const FilterInput: React.FC<FilterInputProps> = ({ 
  threshold, 
  onThresholdChange,
  label = "Filter by minimum sales:" 
}) => {
  return (
    <Input
      type="number"
      label={label}
      value={threshold}
      onChange={(e) => onThresholdChange(Number(e.target.value))}
      min="0"
      step="10"
      className="w-64"
    />
  );
};