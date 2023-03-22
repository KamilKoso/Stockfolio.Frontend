import { ChartDataset, DefaultDataPoint, ChartType } from 'chart.js';
import { StockfolioChartColorMode } from './stockfolio-chart-color-modes.enum';

export type StockfolioChartDataset<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>> = ChartDataset<TType, TData> &
  StocfolioGradientChartDataSet & {
    color?: string;
  };

type StocfolioGradientChartDataSet = {
  colorMode?: StockfolioChartColorMode;
  gradientColorStop?: string;
  gradientDirection?: { x0: number; y0: number; x1: number; y1: number };
};
