import React from 'react';
import { Input } from '../atoms/Input';

interface FilterInputProps {
  threshold: number;
  onThresholdChange: (value: number) => void;
}

export const FilterInput: React.FC<FilterInputProps> = ({ threshold, onThresholdChange }) => {
  return (
    <Input
      type="number"
      label="Filter by minimum sales:"
      value={threshold}
      onChange={(e) => onThresholdChange(Number(e.target.value))}
      min="0"
      className="w-64"
    />
  );
};