import { QuoteChartPricePoint } from './quote-chart-price-point';
import { QuoteDividend } from './quote-dividend';
import { QuoteSplit } from './quote-split';

export class QuoteHistoricalData {
  symbol: string;
  currency: string;
  dividends: QuoteDividend[] = [];
  splits: QuoteSplit[] = [];
  prices: QuoteChartPricePoint[] = [];
}
