import { ChangeDetectionStrategy, Component, Input, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormGroupDirective } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mat-error[control], mat-error[controlName]',
  template: '{{ error$ | async }}',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockfolioErrorMessageComponent implements OnInit {
  @Input() control: Nullable<AbstractControl>;
  @Input() controlName: Nullable<string>;
  @Input() prefix: string = 'validation';
  public error$: Observable<string>;

  constructor(@Optional() private _formGroup: FormGroupDirective, private _translateService: TranslateService) {}

  ngOnInit(): void {
    if (!this.control && !this.controlName) {
      throw new Error('Validation Feedback must have [control] or [controlName] inputs');
    } else if (this.controlName && this._formGroup) {
      this.control = this._formGroup.form.get(this.controlName);
    }

    this.error$ = this.control.statusChanges.pipe(
      switchMap(status => {
        if (status == 'INVALID') {
          const error = Object.keys(this.control.errors)[0];
          const interpolationParams = this.control.errors[error];
          return this._translateService.get(`${this.prefix}.${error}`, interpolationParams);
        } else {
          return of('');
        }
      })
    );
  }
}
