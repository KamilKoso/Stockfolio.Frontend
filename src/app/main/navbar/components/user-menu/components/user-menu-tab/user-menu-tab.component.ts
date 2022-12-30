import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'stockfolio-user-menu-tab',
  templateUrl: './user-menu-tab.component.html',
  styleUrls: ['./user-menu-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuTabComponent {
  @Input() title: string;
  @Output() backButtonClick = new EventEmitter<MouseEvent>();

  constructor() {}
}
