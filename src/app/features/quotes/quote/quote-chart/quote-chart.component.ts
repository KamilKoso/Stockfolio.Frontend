import { Component, Input } from '@angular/core';
import { QuoteHistoricalData } from '../../../../shared/services/stockmarket/models/quote-historical-data';
import { StockfolioChartData } from 'src/app/shared/components/stockfolio-chart/models/stockfolio-chart-data';
import { StockfolioChartOptions } from 'src/app/shared/components/stockfolio-chart/models/stockfolio-chart-options';
import { StockfolioChartColorMode } from 'src/app/shared/components/stockfolio-chart/models/stockfolio-chart-color-modes.enum';
import { ThemeService } from 'src/app/shared/services/theme/theme.service';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { ThemeColors } from 'src/app/shared/services/theme/theme-colors';

@Component({
  selector: 'stockfolio-quote-chart',
  templateUrl: './quote-chart.component.html',
  styleUrls: ['./quote-chart.component.scss'],
})
export class QuoteChartComponent {
  chartDataSubject$ = new Subject<QuoteHistoricalData>();
  chartDataMapped$: Observable<StockfolioChartData> = combineLatest([this.chartDataSubject$, this._themeService.themeColors$]).pipe(
    map(([data, colors]) => this.mapToChartData(data, colors))
  )
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
        time: {
          minUnit: 'hour',
        },
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

  @Input() set data(value: QuoteHistoricalData) {
    this.chartDataSubject$.next(value)
  }

  constructor(private _themeService: ThemeService) {
  }

  private mapToChartData(chartData: QuoteHistoricalData, colors: ThemeColors): StockfolioChartData {
    const determineTheColor = (latestIndexValue: number, previousIndexValue: number) => {
      if(previousIndexValue == latestIndexValue) {
        return colors['stockfolio-no-change-text'];
      } else if(previousIndexValue > latestIndexValue) {
        return colors['stockfolio-loss-text'];
      } else {
        return colors['stockfolio-gain-text'];
      }
    }

    const volumeColor = colors['stockfolio-primary-darker'];
    volumeColor.a = 0.3;


    return {
      labels: chartData.prices.map(x => new Date(x.date)),
      datasets: [
        {
          type: 'bar',
          label: 'Volume',
          data: chartData.prices.map(x => x.volume),
          yAxisID: 'dontShowYAxis',
          borderWidth: 0,
          colorMode: StockfolioChartColorMode.Fill,
          color: volumeColor.toString(),
        },
        {
          type: 'line',
          label: chartData.symbol,
          data: chartData.prices.map(x => x.adjustedClose),
          borderWidth: 1,
          pointRadius: 0,
          yAxisID: 'pricesYAxis',
          colorMode: StockfolioChartColorMode.Gradient,
          color: determineTheColor(
            chartData.prices[chartData.prices.length - 1].adjustedClose,
            chartData.prices[chartData.prices.length - 2].adjustedClose
          ).toString(),
          gradientDirection: { x0: 0, x1: 0, y0: -1000, y1: 1000 },
        },
      ],
    };
  }
}
