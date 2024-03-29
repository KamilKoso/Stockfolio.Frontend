import { Quote } from './quote';

export class QuoteDetails extends Quote {
  marketCap: number;
  language?: any;
  region: string;
  quoteSourceName: string;
  firstTradeDate: Date;
  lastDividendPayDate?: any;
  volume: number;
  marketOpenPrice: number;
  ask: number;
  bid: number;
  bidSize: number;
  fullExchangeName: string;
  financialCurrency: string;
  averageDailyVolume3Month: number;
  averageDailyVolume10Day: number;
  earningsTime: Date;
  earningsTimeStart: Date;
  earningsTimeEnd: Date;
  trailingAnnualDividendRate: number;
  trailingPE: number;
  epsTrailingTwelveMonths: number;
  epsForward: number;
  bookValue: number;
  fiftyTwoWeekRange: string;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekHighChange?: any;
  fiftyTwoWeekHighChangePercent?: any;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekLowChange: number;
  fiftyTwoWeekLowChangePercent: number;
  fiftyDayAverage: number;
  fiftyDayAverageChange: number;
  fiftyDayAverageChangePercent: number;
  twoHundredDayAverage: number;
  twoHundredDayAverageChange: number;
  twoHundredDayAverageChangePercent: number;
  exchangeTimezoneName: string;
  exchangeTimezoneShortName: string;
  market: string;
  epsCurrentYear: number;
  priceEpsCurrentYear: number;
  sharesOutstanding: number;
  forwardPE: number;
  priceToBook: number;
  exchangeDataDelayedBy: number;
}
