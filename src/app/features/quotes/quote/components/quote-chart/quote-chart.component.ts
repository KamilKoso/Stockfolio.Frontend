import { Component, Input, OnInit } from '@angular/core';
import { QuoteHistoricalData } from '../../../../../shared/services/stockmarket/models/quote-historical-data';
import { StockfolioChartData } from 'src/app/shared/components/stockfolio-chart/typings/stockfolio-chart-data';
import { StockfolioChartOptions } from 'src/app/shared/components/stockfolio-chart/typings/stockfolio-chart-options';
import { StockfolioChartColorMode } from 'src/app/shared/components/stockfolio-chart/models/stockfolio-chart-color-modes.enum';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { BehaviorSubject, ReplaySubject, combineLatest, map, switchMap, tap } from 'rxjs';
import { ThemeColors } from 'src/app/shared/services/theme/theme-colors';
import { ChartDateRangeSelector } from '../../models/chart-date-range-selector';
import { StockMarketService } from 'src/app/shared/services/stockmarket/stock-market.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StockfolioChartDataset } from 'src/app/shared/components/stockfolio-chart/typings/stockfolio-chart-data-set';

@Component({
  selector: 'stockfolio-quote-chart',
  templateUrl: './quote-chart.component.html',
  styleUrls: ['./quote-chart.component.scss'],
})
export class QuoteChartComponent implements OnInit {
  private _dividendsImage: HTMLImageElement = new Image();

  chartDateRanges: ChartDateRangeSelector[] = [
    { displayText: '1d', range: '1d', interval: '15m' },
    { displayText: '5d', range: '5d', interval: '15m' },
    { displayText: '1M', range: '1mo', interval: '1d' },
    { displayText: '6M', range: '6mo', interval: '1d' },
    { displayText: 'YTD', range: 'ytd', interval: '1d' },
    { displayText: '1Y', range: '1y', interval: '1d' },
    { displayText: '5Y', range: '5y', interval: '1d' },
    { displayText: 'All', range: 'max', interval: '1d' },
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

  chart$ = combineLatest([this.chartData$, this._themeService.themeColors$]).pipe(
    map(([data, colors]) => this.parseChartData(data, colors))
  );

  constructor(
    private _themeService: ThemeService,
    private _stockMarketService: StockMarketService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this._dividendsImage.src = "/assets/images/dividends_icon.svg";
  }

  private parseChartData(chartData: QuoteHistoricalData, colors: ThemeColors): ({data: StockfolioChartData, options: StockfolioChartOptions }) {
    const determineTheColor = (prices: number[]) => {
      const pricesWithoutNulls = prices.filter(x => x);
      const firstIndexPrice = pricesWithoutNulls[0]
      const lastIndexPrice = pricesWithoutNulls[pricesWithoutNulls.length-1];

      if (firstIndexPrice == lastIndexPrice) {
        return colors['stockfolio-no-change-text'];
      } else if (firstIndexPrice > lastIndexPrice) {
        return colors['stockfolio-loss-text'];
      } else {
        return colors['stockfolio-gain-text'];
      }
    };

    const volumeColor = colors['stockfolio-primary-darker'];
    volumeColor.a = 0.3;
    const priceData = chartData.prices.map(x => x.adjustedClose ?? x.open);

    const chartDataParsed = {
      labels: chartData.prices.map(x => new Date(x.date)),
      datasets: [
        {
          type: 'line',
          label: chartData.symbol,
          data: priceData,
          borderWidth: 1.5,
          pointRadius: 0,
          yAxisID: 'pricesYAxis',
          colorMode: StockfolioChartColorMode.Gradient,
          color: determineTheColor(priceData).toString(),
          gradientDirection: { x0: 0, x1: 0, y0: -1000, y1: 1000 },
          animation: "progress",
          tension: 0.2,
        } as StockfolioChartDataset<'line'>,
         {
          type: 'line',
          label: "Dividends",
          data: chartData.dividends.map(x => ({date: x.date, value: x.amount})) as any,
          showLine: false,
          pointStyle: this._dividendsImage,
          hoverBackgroundColor: "red",
          yAxisID: "dontShowYAxis"
        } as StockfolioChartDataset<'line'>,
        {
          type: 'bar',
          label: 'Volume',
          data: chartData.prices.map(x => x.volume),
          yAxisID: 'dontShowYAxis',
          borderWidth: 0,
          colorMode: StockfolioChartColorMode.Fill,
          color: volumeColor.toString(),
          animation: "progress",
        } as StockfolioChartDataset<'bar'>,
      ],
    };

    const chartOptions: StockfolioChartOptions = {
    responsive: true,
    parsing: {
            xAxisKey: "date",
            yAxisKey: "value",
      },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'nearest',
        intersect: false,
      },
    },
    interaction: {
      axis: "x",
      intersect: false
    },
    scales: {
      x: {
        type: 'timeseries',
        ticks: {
          autoSkip: true,
          autoSkipPadding: 200,
        },
        grid: {
          display: false
        }
      },
      pricesYAxis: {
        axis: 'y',
        beginAtZero: false,

      },
      dontShowYAxis: {
        axis: 'y',
        display: false,
      },
    },
  };

    return {data: chartDataParsed, options: chartOptions}
  }
}
