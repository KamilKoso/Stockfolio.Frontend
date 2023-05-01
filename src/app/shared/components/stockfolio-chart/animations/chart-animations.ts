import { ChartType } from 'chart.js';
import { AnimationBase } from './animation-base';
import { ProgressiveBarAnimation } from './bar/progressive-bar-animation';
import { DeepPartial } from 'ts-essentials';
import { ProgressiveLineAnimation } from './line/progressive-line-animation';
import { AnimationName } from '../typings/animation-name';

export const ChartAnimations: DeepPartial<Record<ChartType, Record<AnimationName<ChartType>, AnimationBase<ChartType>>>> = {
  "line": {
    "progress": new ProgressiveLineAnimation(),
  },
  "bar": {
    "progress": new ProgressiveBarAnimation(),
  }
}



