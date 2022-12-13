import { ComponentRef, Directive, Input, Renderer2, ViewContainerRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: `button[mat-button][showSpinner],
             button[mat-raised-button][showSpinner],
             button[mat-icon-button][showSpinner],
             button[mat-fab][showSpinner],
             button[mat-mini-fab][showSpinner],
             button[mat-stroked-button][showSpinner],
             button[mat-flat-button][showSpinner]`,
})
export class StockfolioButtonWithSpinnerDirective {
  private loadingClass = 'stockfolio-loading';
  private spinner: ComponentRef<MatProgressSpinner>;

  @Input() diameter: number = 20;
  @Input() set showSpinner(value: boolean) {
    if (value) {
      this.nativeElement.classList.add(this.loadingClass);
      this.createSpinner();
    } else {
      this.nativeElement.classList.remove(this.loadingClass);
      this.destroySpinner();
    }
  }

  get nativeElement(): HTMLElement {
    return this._matButton._elementRef.nativeElement;
  }

  constructor(private _matButton: MatButton,
              private _viewContainerRef: ViewContainerRef,
              private _renderer: Renderer2) {}

  private createSpinner(): void {
    if (!this.spinner) {
      this.spinner = this._viewContainerRef.createComponent(MatProgressSpinner);
      this.spinner.instance.diameter = this.diameter;
      this.spinner.instance.mode = 'indeterminate';
      this._matButton.disabled = true;
      this._renderer.appendChild(this.nativeElement, this.spinner.instance._elementRef.nativeElement);
    }
  }

  private destroySpinner(): void {
    if (this.spinner) {
      this.spinner.destroy();
      this.spinner = null;
      this._matButton.disabled = false;
    }
  }
}
