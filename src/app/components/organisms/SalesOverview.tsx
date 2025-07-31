"use client";

import React, { useState } from 'react';
import { Select } from '../atoms/Select';
import { ChartSelector } from '../molecules/ChartSelector';
import { FilterInput } from '../molecules/FilterInput';
import { BarChartComponent } from './BarChartComponent';
import { LineChartComponent } from './LineChartComponent';
import { PieChartComponent } from './PieChartComponent';
import { YearlySales, ChartType } from '../types/sales';
import { filterSalesAboveThreshold, getAvailableYears } from '../lib/utils';

interface SalesOverviewProps {
  salesData: YearlySales[];
}

export const SalesOverview: React.FC<SalesOverviewProps> = ({ salesData }) => {
  const [selectedYear, setSelectedYear] = useState<number>(salesData[0].year);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [threshold, setThreshold] = useState<number>(0);

  const filteredData = filterSalesAboveThreshold(salesData, threshold);
  const availableYears = getAvailableYears(salesData);

  const yearOptions = availableYears.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return <BarChartComponent data={filteredData} selectedYear={selectedYear} />;
      case 'line':
        return <LineChartComponent data={filteredData} selectedYear={selectedYear} />;
      case 'pie':
        return <PieChartComponent data={filteredData} selectedYear={selectedYear} />;
      default:
        return <BarChartComponent data={filteredData} selectedYear={selectedYear} />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end">
        <div className="space-y-2">
          <Select
            label="Select Year:"
            options={yearOptions}
            value={selectedYear.toString()}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          />
          <FilterInput threshold={threshold} onThresholdChange={setThreshold} />
        </div>
        <ChartSelector activeChart={chartType} onChange={setChartType} />
      </div>
      {renderChart()}
    </div>
  );
};