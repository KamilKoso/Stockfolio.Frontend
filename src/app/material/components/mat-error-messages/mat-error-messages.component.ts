import { AfterViewInit, Component, Injector } from '@angular/core';
import {
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { TranslateService } from '@ngx-translate/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[matErrorMessages]',
  template: '{{ error }}',
})
export class MatErrorMessagesComponent implements AfterViewInit {
  public error = '';
  private inputRef!: MatFormFieldControl<MatInput>;

  constructor(
    private _inj: Injector,
    private _translateService: TranslateService
  ) {}

  public ngAfterViewInit(): void {
    const container = this._inj.get(MatFormField);
    this.inputRef = container._control;
    this.inputRef.ngControl!.statusChanges!.subscribe(this.updateErrors);
  }

  private updateErrors = (state: 'VALID' | 'INVALID'): void => {
    if (state === 'INVALID') {
      const controlErrors = this.inputRef!.ngControl!.errors;
      const firstError = Object.keys(controlErrors!)[0];
      const varList = Object.values(controlErrors!)[0];
      this.error = this._translateService.instant(
        `validation.${firstError}`,
        varList
      );
    }
  };
}
