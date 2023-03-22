import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { map } from 'rxjs';
import { ThemeService } from '../../services/theme/theme.service';
import { Themes } from '../../services/theme/themes-enum';

@Component({
  selector: 'stockfolio-skeleton-loader',
  template: '<ngx-skeleton-loader [animation]="currentTheme$ | async" [appearance]="appearance"></ngx-skeleton-loader>',
  styleUrls: ['./stockfolio-skeleton-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StockfolioSkeletonLoaderComponent {
  @Input() appearance: '' | 'circle' | 'line' = '';

  currentTheme$ = this._themeService.displayedTheme$.pipe(map(theme => (theme == Themes.Dark ? 'progress-dark' : 'progress')));

  constructor(private _themeService: ThemeService) {}
}
