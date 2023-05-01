import { ChartType } from 'chart.js';
import { AnimationName } from './animation-name';

export type StockfolioChartAnimationOptions<TType extends ChartType> = {
  color: string;
  animationDuration: number;
  animation: AnimationName<TType>;
};
