import { ChartType } from 'chart.js';
import { ChartAnimations } from './chart-animations';

export type AnimationName<TChartType extends ChartType> = ChartAnimations[TChartType];

