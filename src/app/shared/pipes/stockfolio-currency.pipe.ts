import { CurrencyPipe } from '@angular/common';
import { DEFAULT_CURRENCY_CODE, Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'stockfolioCurrency' })
export class StockfolioCurrencyPipe implements PipeTransform {
  private currencyPipe: CurrencyPipe = new CurrencyPipe(this._currentLocale, this._defaultCurrencyCode);
  constructor(@Inject(LOCALE_ID) private _currentLocale: string, @Inject(DEFAULT_CURRENCY_CODE) private _defaultCurrencyCode: string) {}

  transform(
    value: number,
    currencyCode: string,
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '.2-5',
    locale: string = this._currentLocale
  ) {
    const currencyFormat = this.currencyPipe.transform(value, currencyCode, display, digitsInfo, locale);
    const firstDigit = currencyFormat.search(/\d/);
    return currencyFormat.substring(0, firstDigit) + ' ' + currencyFormat.substring(firstDigit);
  }
}
