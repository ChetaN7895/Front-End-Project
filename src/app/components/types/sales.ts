export interface MonthlySales {
  month: string;
  sales: number;
}

export interface YearlySales {
  year: number;
  data: MonthlySales[];
}

export type ChartType = 'bar' | 'line' | 'pie';