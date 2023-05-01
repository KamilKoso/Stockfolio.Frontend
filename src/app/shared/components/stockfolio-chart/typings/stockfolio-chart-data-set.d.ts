import { ChartDataset, DefaultDataPoint, ChartType } from 'chart.js';
import { StockfolioChartColorMode } from '../models/stockfolio-chart-color-modes.enum';
import { DeepPartial } from 'ts-essentials';
import { StockfolioChartAnimationOptions } from './stockfolio-chart-animation-options';

export type StockfolioChartDataset<TType extends ChartType = ChartType, TData = DefaultDataPoint<TType>> =
  Omit<ChartDataset<TType, TData>, "animation" | "animations" | "borderColor" | "backgroundColor"> &
  StockfolioChartAnimationOptions<TType> &
  DeepPartial<
    StocfolioGradientChartDataSet & {
      colorMode: StockfolioChartColorMode;
      color: string;
    }
  >;

type StocfolioGradientChartDataSet = {
  gradientColorStop: string;
  gradientDirection: { x0: number; y0: number; x1: number; y1: number };
};

