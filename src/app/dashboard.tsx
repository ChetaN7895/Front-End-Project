

import { useState } from 'react';
import { MOCK_SALES_DATA } from './components/lib/constants';
import { filterSalesAboveThreshold, getAvailableYears } from './components//lib/utils';
import { DashboardTemplate } from './components/templates/DashboardTemplate';
import { SalesOverview } from './components/organisms/SalesOverview';
import type { ChartType } from './components/types/sales';

export default function Dashboard() {
  const [threshold, setThreshold] = useState(0);
    const [chartType, setChartType] = useState<ChartType>('bar');
  
  // Get the latest year as default
  const latestYear = Math.max(...MOCK_SALES_DATA.map(item => item.year));
  const [selectedYear, setSelectedYear] = useState(latestYear);

  // Filter data based on threshold
  const filteredData = filterSalesAboveThreshold(MOCK_SALES_DATA, threshold);

  return (
    <DashboardTemplate title="Sales Dashboard">
      <SalesOverview 
        salesData={filteredData}
        selectedYear={selectedYear}
        onYearChange={setSelectedYear}
        chartType={chartType}
        onChartTypeChange={setChartType}
        threshold={threshold}
        onThresholdChange={setThreshold}
      />
    </DashboardTemplate>
  );
}