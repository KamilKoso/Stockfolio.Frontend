import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuoteChartComponent } from './quote/components/quote-chart/quote-chart.component';
import { QuoteComponent } from './quote/quote.component';
import { QuotesRoutingModule } from './quotes.routing.module';

@NgModule({
  imports: [QuotesRoutingModule, SharedModule],
  declarations: [QuoteComponent, QuoteChartComponent],
})
export class QuotesModule {}
