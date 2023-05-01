import { AnimationsSpec } from "chart.js";
import { AnimationBase } from "../animation-base";
import { DeepPartial } from "ts-essentials";


export class ProgressiveLineAnimation implements AnimationBase<"line"> {
  animation: DeepPartial<AnimationsSpec<"line">> = {
    x: {
        type: 'number',
        from: NaN,
        delay(ctx) {
          return (ctx.dataIndex * ctx.dataset["animationDuration"]) / ctx.dataset.data.length;
        },
    }
  }
}

