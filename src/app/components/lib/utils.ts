import { YearlySales } from "@/types/sales";

export const filterSalesAboveThreshold = (data: YearlySales[], threshold: number): YearlySales[] => {
  return data.map(yearData => ({
    ...yearData,
    data: yearData.data.filter(month => month.sales >= threshold)
  }));
};

export const getAvailableYears = (data: YearlySales[]): number[] => {
  return data.map(item => item.year);
};