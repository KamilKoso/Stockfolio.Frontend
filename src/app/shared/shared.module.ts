import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { StockfolioButtonWithSpinnerDirective } from './directives/stockfolio-button-with-spinner/stockfolio-button-with-spinner.directive';
import { StockfolioErrorMessageComponent } from './components/stockfolio-error-messages/stockfolio-error-messages.component';

import { ShowPasswordDirective } from './directives/show-password.directive';
import { HttpAuthInterceptor } from './interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { HttpRetryInterceptor } from './interceptors/http-retry.interceptor';
import { ApiErrorTranslatedPipe } from './pipes/api-error-translated.pipe';
import { StockfolioTooltipOnOverflowDirective } from './directives/tooltip-on-overflow/stockfolio-tooltip-on-overflow.directive';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { TranslateModule } from '@ngx-translate/core';
import { PercentageChangeLabelComponent } from './components/percentage-change-label/percentage-change-label.component';
import { AbsoluteNumberPipe } from './pipes/absolute-number.pipe';
import { StockfolioCurrencyPipe } from './pipes/stockfolio-currency.pipe';
import { UserAvatarComponent } from './components/user-avatar/user-avatar.component';
import { NgChartsModule } from 'ng2-charts';
import { StockfolioChartComponent } from './components/stockfolio-chart/stockfolio-chart.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { StockfolioSkeletonLoaderComponent } from './components/stockfolio-skeleton-loader/stockfolio-skeleton-loader.component';
import { NgxVarDirective } from './directives/ngx-var/ngx-var.directive';

const imports = [
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  HttpClientModule,
  MaterialModule,
  LoadingBarHttpClientModule,
  TranslateModule,
  NgChartsModule,
  NgxSkeletonLoaderModule,
];
const components = [
  StockfolioErrorMessageComponent,
  PercentageChangeLabelComponent,
  UserAvatarComponent,
  StockfolioChartComponent,
  StockfolioSkeletonLoaderComponent,
];
const directives = [ShowPasswordDirective, StockfolioButtonWithSpinnerDirective, StockfolioTooltipOnOverflowDirective, NgxVarDirective];
const pipes = [ApiErrorTranslatedPipe, AbsoluteNumberPipe, StockfolioCurrencyPipe];

@NgModule({
  imports: imports,
  declarations: [...components, ...directives, ...pipes],
  exports: [...imports, ...components, ...directives, ...pipes],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true },
  ],
})
export class SharedModule {}
