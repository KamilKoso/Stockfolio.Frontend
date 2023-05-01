
export type ChartAnimations = {
  bar: BarAnimations;
  line: LineAnimations;
  scatter: ScatterAnimations;
  bubble: BubbleAnimations;
  pie: PieAnimations;
  doughnut: DoughnutAnimations;
  polarArea: PolarAreaAnimations;
  radar: RadarAnimations;
}

type BarAnimations = 'progress' | 'none';
type LineAnimations = 'progress';
type ScatterAnimations = never
type BubbleAnimations = never;
type PieAnimations = never
type DoughnutAnimations = never
type PolarAreaAnimations = never
type RadarAnimations = never
