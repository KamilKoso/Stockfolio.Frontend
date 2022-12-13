import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features.routing.module';

@NgModule({
  imports: [SharedModule, FeaturesRoutingModule],
  declarations: [],
  exports: [],
})
export class FeaturesModule {}
