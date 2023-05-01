import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables, ChartConfiguration, TimeScaleOptions } from 'chart.js';
import 'chartjs-adapter-date-fns';
import 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { StockfolioChartColorMode } from './models/stockfolio-chart-color-modes.enum';
import { StockfolioChartData } from './typings/stockfolio-chart-data';
import { StockfolioChartDataset } from './typings/stockfolio-chart-data-set';
import { StockfolioChartOptions } from './typings/stockfolio-chart-options';
import * as Locales from 'date-fns/locale';
import { LanguageService } from '../../services/language/language.service';
import { Subscription } from 'rxjs';
import { ChartAnimations } from './animations/chart-animations';
import { ChartDataset } from 'chart.js';



const DEFAULT_ANIMATIONS_DURATION = 500;

@Component({
  selector: 'stockfolio-chart',
  templateUrl: './stockfolio-chart.component.html',
  styleUrls: ['./stockfolio-chart.component.scss'],
})
export class StockfolioChartComponent implements OnDestroy, OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective, { read: ElementRef }) chartCanvas: ElementRef;
  @ViewChild(BaseChartDirective) chartDirective: BaseChartDirective;
  _chartDataMapped: ChartConfiguration['data'];
  _chartData: StockfolioChartData;
  _chartOptions: StockfolioChartOptions;

  languageChangeSubscription: Subscription;

  @Input() set data(value: StockfolioChartData) {
    this._chartData = value;
    this.mapChartData(value);
    this.chartDirective?.update();
  }

  @Input() set options(value: StockfolioChartOptions) {
    // Makes sure to trigger change detection if needed
    this._chartOptions = { ...value, ...this._chartOptions };
  }

  constructor(private languageService: LanguageService) {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.mapChartData(this._chartData);
  }

  ngOnInit(): void {
    this.handleLanguageChange();
  }

  ngOnDestroy(): void {
    this.languageChangeSubscription?.unsubscribe();
  }

  private mapChartData(chartData: StockfolioChartData): void {
    this._chartDataMapped = { ...chartData as any };

    if (this.chartCanvas) {
      for (let stockfiolioDataSet of chartData.datasets as (StockfolioChartDataset & ChartDataset)[]) {
        if (stockfiolioDataSet.colorMode != null) {
          this.handleColorModes(stockfiolioDataSet);
        }
        if (stockfiolioDataSet.animation) {
          this.handleAnimations(stockfiolioDataSet);
        }
      }
    }
  }

  private handleAnimations(dataset) {
    dataset.animationDuration ??= DEFAULT_ANIMATIONS_DURATION;
    dataset.animations = ChartAnimations[dataset.type][dataset.animation].animation;
  }

  private updateLocale(locale: Locale): void {
    for (let scale of Object.keys(this._chartOptions.scales)) {
      (this._chartOptions.scales[scale] as TimeScaleOptions).adapters = {
        date: {
          locale: locale,
        },
      };
    }
  }

  private handleLanguageChange() {
    this.languageChangeSubscription = this.languageService.language$.subscribe(currentLang => {
      const locale = Locales[currentLang.code.substring(0, 2)] ?? Locales.enUS;
      this.updateLocale(locale);
      this.options = this._chartOptions;
    });
  }

  private handleColorModes(dataset: StockfolioChartDataset & ChartDataset) {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const gradient = ctx.createLinearGradient(
      dataset.gradientDirection?.x0 ?? 0,
      dataset.gradientDirection?.y0 ?? 0,
      dataset.gradientDirection?.x1 ?? 0,
      dataset.gradientDirection?.y1 ?? 500
    );
    gradient.addColorStop(1, dataset.gradientColorStop ?? 'rgba(0,0,0,0)');

    switch (dataset.colorMode) {
      case StockfolioChartColorMode.Gradient: {
        dataset.borderColor = dataset.color;
        gradient.addColorStop(0, dataset.color);
        dataset.backgroundColor = gradient;
        dataset["fill"] = true;
        break;
      }
      case StockfolioChartColorMode.Fill: {
        dataset.borderColor = dataset.color;
        dataset.backgroundColor = dataset.color;
        dataset["fill"] = true;
        break;
      }
    }
  }
}
