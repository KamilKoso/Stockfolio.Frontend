import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, ScrollDispatcher } from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { Directive, ElementRef, ViewContainerRef, NgZone, Inject, Optional, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTooltip, MatTooltipDefaultOptions, MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_SCROLL_STRATEGY } from '@angular/material/tooltip';
import { fromEvent, Subscription } from 'rxjs';

@Directive({
  selector: '[stockfolioTooltipOnOverflow]',
})
export class StockfolioTooltipOnOverflowDirective extends MatTooltip implements AfterViewInit, OnDestroy {
  private _labelRef: ElementRef;
  private overflowDetectionSubscription: Subscription;

  constructor(
    private _host: ElementRef,
    _overlay: Overlay,
    _scrollDispatcher: ScrollDispatcher,
    _viewContainerRef: ViewContainerRef,
    _ngZone: NgZone,
    _platform: Platform,
    _ariaDescriber: AriaDescriber,
    _focusMonitor: FocusMonitor,
    @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) _scrollStrategy: any,
    @Optional() _dir: Directionality,
    @Optional()
    @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS)
    _defaultOptions: MatTooltipDefaultOptions
  ) {
    super(
      _overlay,
      _host,
      _scrollDispatcher,
      _viewContainerRef,
      _ngZone,
      _platform,
      _ariaDescriber,
      _focusMonitor,
      _scrollStrategy,
      _dir,
      _defaultOptions,
      document
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.overflowDetectionSubscription?.unsubscribe();
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    super.message = this._host.nativeElement.innerText;
    this.detectOverflow();
  }

  private detectOverflow(): void {
    this.overflowDetectionSubscription = fromEvent(window, 'resize').subscribe(() => {
      this.enableTooltipOnOverflow();
    });
  }

  private enableTooltipOnOverflow(): void {
    super.disabled = !this.isOverflowing();
  }

  private isOverflowing(): boolean {
    return this._labelRef.nativeElement.scrollWidth > this._labelRef.nativeElement.offsetWidth;
  }
}
