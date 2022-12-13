import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, debounceTime, switchMap, map, filter, tap, of, timeInterval } from 'rxjs';
import { Quote } from 'src/app/shared/services/stockmarket/models/quote';
import { StockMarketService } from 'src/app/shared/services/stockmarket/stock-market.service';

@Component({
  selector: 'stockfolio-quotes-serach-bar',
  templateUrl: './quotes-serach-bar.component.html',
  styleUrls: ['./quotes-serach-bar.component.scss'],
})
export class QuotesSerachBarComponent {
  searchField = new FormControl('');
  searchResult$ = this.searchField.valueChanges.pipe(
    distinctUntilChanged(),
    debounceTime(500),
    switchMap(searchQuery =>
      searchQuery && searchQuery?.trim() != '' ? this._stockMarketService.search(searchQuery).pipe(timeInterval()) : of(null)
    ),
    map(val => ({
      quotes: val?.value.quotes,
      count: val?.value.count ?? 0,
      responseTimeInMs: val?.interval,
    })),
  );

  constructor(private _stockMarketService: StockMarketService,
              private _router: Router) {}

  navigateToStock(quote: Quote) {
    this._router.navigateByUrl(`/${quote.symbol}`);
  }

  autocompleteDisplayFunction(quote: Quote) {
    return quote.shortName
  }
}
