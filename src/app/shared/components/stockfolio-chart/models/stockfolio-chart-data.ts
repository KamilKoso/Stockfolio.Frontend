import { ChartData } from 'chart.js';
import { StockfolioChartDataset } from './stockfolio-chart-data-set';

export type StockfolioChartData = Omit<ChartData, 'datasets'> & {
  datasets: StockfolioChartDataset[];
};
