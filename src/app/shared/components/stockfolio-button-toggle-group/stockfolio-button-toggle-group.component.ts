import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, Output, QueryList, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { MatTabChangeEvent } from "@angular/material/tabs";
import { StockfolioButtonToggleComponent } from "./stockfolio-button-toggle/stockfolio-button-toggle.component";

@Component({
  selector: 'stockfolio-button-toggle-group',
  templateUrl: './stockfolio-button-toggle-group.component.html',
  styleUrls: ['./stockfolio-button-toggle-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>StockfolioButtonToggleGroupComponent),
      multi: true,
    },
  ],
})
export class StockfolioButtonToggleGroupComponent implements ControlValueAccessor, AfterViewInit {
  private _value: any;
  private _onChangeFn: (value: any) => void = () => {};
  private _onTouchedFn: () => void = () => {};
  @ContentChildren(StockfolioButtonToggleComponent) buttons: QueryList<StockfolioButtonToggleComponent>;

  @Input() color: 'accent' | 'primary' = 'accent';
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<any>();

  selectedIndex: number;
  disabled: boolean;

  get value() {
    return this._value;
  }

  set value(value: any) {
    this.selectedIndex = Array.from(this.buttons).findIndex(x => x.value === value);
    this._value = value;
    this._onChangeFn(value);
  }

  constructor(private _cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this._cdr.detectChanges();
    this.selectedIndex = this.buttons["_results"]?.findIndex(x => x.value === this._value);
  }

  writeValue(obj: any): void {
    this._value = obj;
    if(this.buttons) {
      this.selectedIndex = this.buttons['_results']?.findIndex(x => x.value === obj);
    }
  }

  registerOnChange(fn: any): void {
    this._onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouchedFn = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent) {
    const button = this.buttons.get(tabChangeEvent.index);
    this.change.emit(button.value);
    button.change.emit(button.value);
    this._onChangeFn(button.value);
    this._onTouchedFn();
  }
}
