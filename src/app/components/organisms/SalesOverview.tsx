"use client";

import React, { useState } from "react";
import { Select } from "../atoms/Select";
import { ChartSwitcher } from "../molecules/ChartSwitcher";
import { FilterInput } from "../molecules/FilterInput";
import { BarChartComponent } from "./BarChartComponent";
import { LineChartComponent } from "./LineChartComponent";
import { PieChartComponent } from "./PieChartComponent";
import { YearlySales, ChartType } from "../types/sales";
import { filterSalesAboveThreshold, getAvailableYears } from "../lib/utils";

interface SalesOverviewProps {
  salesData: YearlySales[];
}

export const SalesOverview: React.FC<SalesOverviewProps> = ({ salesData }) => {
  const [selectedYear, setSelectedYear] = useState<number>(salesData[0].year);
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [minSales, setMinSales] = useState<number>(0);

  // Filter data based on minimum sales
  const filteredData = filterSalesAboveThreshold(salesData, minSales);

  const availableYears = getAvailableYears(filteredData);
  const yearOptions = availableYears.map((year) => ({
    value: year.toString(),
    label: year.toString(),
  }));

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return (
          <BarChartComponent data={filteredData} selectedYear={selectedYear} />
        );
      case "line":
        return (
          <LineChartComponent data={filteredData} selectedYear={selectedYear} />
        );
      case "pie":
        return (
          <PieChartComponent data={filteredData} selectedYear={selectedYear} />
        );
      default:
        return (
          <BarChartComponent data={filteredData} selectedYear={selectedYear} />
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-end mb-6">
        <div className="space-y-4 w-full md:w-auto">
          <Select
            label="Select Year:"
            options={yearOptions}
            value={selectedYear.toString()}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="w-full md:w-48"
          />
          <FilterInput
            threshold={minSales}
            onThresholdChange={setMinSales}
            label="Minimum Sales ($):"
            // className="w-full md:w-64"
          />
        </div>
        <ChartSwitcher
          activeChart={chartType}
          onChange={setChartType}
          className="w-full md:w-auto"
        />
      </div>

      <div className="mt-8">
        {filteredData.some((year) => year.year === selectedYear) ? (
          renderChart()
        ) : (
          <div className="text-center py-12 text-gray-500 border border-dashed rounded-lg">
            <p className="text-lg">No sales data available</p>
            <p className="text-sm mt-2">
              {minSales > 0
                ? `No months in ${selectedYear} had sales ≥ $${minSales.toLocaleString()}`
                : `No data available for ${selectedYear}`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
