import { AnimationsSpec, ChartType } from 'chart.js';
import { DeepPartial } from 'ts-essentials';

export interface AnimationBase<TChartType extends ChartType = ChartType> {
  readonly animation: DeepPartial<AnimationsSpec<TChartType>>;
}
