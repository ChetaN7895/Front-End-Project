import { useState } from 'react';
import { salesData } from './data/mockSalesData';
import FilterInput from './components/molecules/FilterInput';
import ChartSwitcher from './components/ChartSwitcher';

export default function Dashboard() {
  const [filteredData, setFilteredData] = useState(salesData);

  const handleFilter = (threshold: number) => {
    setFilteredData(salesData.filter(item => item.sales >= threshold));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>
      <FilterInput onFilter={handleFilter} />
      <ChartSwitcher data={filteredData} />
    </div>
  );
}
