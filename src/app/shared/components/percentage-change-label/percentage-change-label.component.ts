import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stockfolio-percentage-change-label',
  templateUrl: './percentage-change-label.component.html',
  styleUrls: ['./percentage-change-label.component.scss']
})
export class PercentageChangeLabelComponent {
  @Input() percentage;

}
