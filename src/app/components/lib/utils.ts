import { YearlySales } from "../types/sales";

export const filterSalesAboveThreshold = (data: YearlySales[], threshold: number): YearlySales[] => {
  return data.map(yearData => ({
    ...yearData,
    data: yearData.data.filter(month => month.sales >= threshold)
  })).filter(yearData => yearData.data.length > 0); // Remove years with no data
};

export const getAvailableYears = (data: YearlySales[]): number[] => {
  return data.map(item => item.year);
};