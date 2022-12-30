import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, switchMap, takeUntil } from 'rxjs';
import { StockMarketService } from 'src/app/shared/services/stockmarket/stock-market.service';

@Component({
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
})
export class QuoteComponent implements OnDestroy {
  destroySubject$ = new Subject<void>();
  quote$ = this._route.params.pipe(
    switchMap(params => this._stockMarketService.getQuoteDetails([params['symbol']])),
    map(value => value[0]),
    takeUntil(this.destroySubject$)
  );
  constructor(private _route: ActivatedRoute, private _stockMarketService: StockMarketService) {}

  ngOnDestroy(): void {
    this.destroySubject$.next();
  }

  getQuote() {}
}
