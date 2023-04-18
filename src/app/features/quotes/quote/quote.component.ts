import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { StockMarketService } from 'src/app/shared/services/stockmarket/stock-market.service';
import { ChartDateRangeSelector } from './models/chart-date-range-selector';

@Component({
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnDestroy {
  private _destroySubject$ = new Subject<void>();

  quoteSymbol$: Observable<string> = this._route.params.pipe(map(params => params['symbol']));

  quote$ = this.quoteSymbol$.pipe(
    switchMap(params => this._stockMarketService.getQuoteDetails([params])),
    map(value => value[0]),
    takeUntil(this._destroySubject$)
  );

  quoteChartRangeSubject$ = new Subject<ChartDateRangeSelector>();

  constructor(private _route: ActivatedRoute, private _stockMarketService: StockMarketService) {}

  ngOnDestroy(): void {
    this._destroySubject$.next();
  }
}
