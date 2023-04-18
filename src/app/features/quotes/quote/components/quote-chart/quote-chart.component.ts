import { Component, Input } from '@angular/core';
import { QuoteHistoricalData } from '../../../../../shared/services/stockmarket/models/quote-historical-data';
import { StockfolioChartData } from 'src/app/shared/components/stockfolio-chart/models/stockfolio-chart-data';
import { StockfolioChartOptions } from 'src/app/shared/components/stockfolio-chart/models/stockfolio-chart-options';
import { StockfolioChartColorMode } from 'src/app/shared/components/stockfolio-chart/models/stockfolio-chart-color-modes.enum';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { BehaviorSubject, ReplaySubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { ThemeColors } from 'src/app/shared/services/theme/theme-colors';
import { ChartDateRangeSelector } from '../../models/chart-date-range-selector';
import { StockMarketService } from 'src/app/shared/services/stockmarket/stock-market.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'stockfolio-quote-chart',
  templateUrl: './quote-chart.component.html',
  styleUrls: ['./quote-chart.component.scss'],
})
export class QuoteChartComponent {
  chartDateRanges: ChartDateRangeSelector[] = [
    { displayText: '1d', range: '1d', interval: '15m' },
    { displayText: '5d', range: '5d', interval: '15m' },
    { displayText: '1M', range: '1mo', interval: '1d' },
    { displayText: '6M', range: '6mo', interval: '1d' },
    { displayText: 'YTD', range: 'ytd', interval: '1d' },
    { displayText: '1Y', range: '1y', interval: '1d' },
  ];

  @Input() set quoteSymbol(value: string) {
    this._quoteSymbolSubject$.next(value);
  }

  private _quoteSymbolSubject$ = new ReplaySubject<string>(1);

  selectedDateRangeSubject$ = new BehaviorSubject<ChartDateRangeSelector>(
    this.chartDateRanges.find(x => x.displayText === this._activatedRoute.snapshot.queryParams['range']) ?? this.chartDateRanges[0]
  );

  selectedDateRange$ = this.selectedDateRangeSubject$.pipe(
    tap(chartRange => {
      this._router.navigate([], {
        queryParams: {
          range: chartRange.displayText,
        },
      });
    })
  );

  chartData$ = combineLatest([this._quoteSymbolSubject$, this.selectedDateRange$]).pipe(
    switchMap(([symbol, chartRange]) => this._stockMarketService.getHistoricalData(symbol, chartRange.interval, chartRange.range))
  );

  chartDataMapped$ = combineLatest([this.chartData$, this._themeService.themeColors$]).pipe(
    map(([data, colors]) => this.mapToChartData(data, colors))
  );

  chartOptions: StockfolioChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'timeseries',
      },
      pricesYAxis: {
        axis: 'y',
      },
      dontShowYAxis: {
        axis: 'y',
        display: false,
      },
    },
  };

  constructor(
    private _themeService: ThemeService,
    private _stockMarketService: StockMarketService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  private mapToChartData(chartData: QuoteHistoricalData, colors: ThemeColors): StockfolioChartData {
    const determineTheColor = (latestIndexValue: number, previousIndexValue: number) => {
      if (previousIndexValue == latestIndexValue) {
        return colors['stockfolio-no-change-text'];
      } else if (previousIndexValue > latestIndexValue) {
        return colors['stockfolio-loss-text'];
      } else {
        return colors['stockfolio-gain-text'];
      }
    };

    const volumeColor = colors['stockfolio-primary-darker'];
    volumeColor.a = 0.3;

    const linePriceChart = chartData.prices.map(x => x.adjustedClose ?? x.open);

    return {
      labels: chartData.prices.map(x => new Date(x.date)),
      datasets: [
        {
          type: 'line',
          label: chartData.symbol,
          data: linePriceChart,
          borderWidth: 1,
          pointRadius: 0,
          yAxisID: 'pricesYAxis',
          colorMode: StockfolioChartColorMode.Gradient,
          color: determineTheColor(linePriceChart[linePriceChart.length - 1], linePriceChart[linePriceChart.length - 2]).toString(),
          gradientDirection: { x0: 0, x1: 0, y0: -1000, y1: 1000 },
        },
        {
          type: 'bar',
          label: 'Volume',
          data: chartData.prices.map(x => x.volume),
          yAxisID: 'dontShowYAxis',
          borderWidth: 0,
          colorMode: StockfolioChartColorMode.Fill,
          color: volumeColor.toString(),
        },
      ],
    };
  }
}
