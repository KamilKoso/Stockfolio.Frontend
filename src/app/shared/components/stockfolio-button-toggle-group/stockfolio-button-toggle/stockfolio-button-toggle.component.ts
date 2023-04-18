import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: 'stockfolio-button-toggle',
  templateUrl: './stockfolio-button-toggle.component.html',
  styleUrls: ['./stockfolio-button-toggle.component.scss'],
})
export class StockfolioButtonToggleComponent {
  @ViewChild(TemplateRef) public buttonTemplate: TemplateRef<any>;
  @Input() value: any;
  @Input() disabled: boolean;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<any>();
 }
