import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { ApiHealthCheckService } from 'src/app/shared/services/health-check/api-health-check.service';

@Component({
  templateUrl: './api-unavailable.component.html',
  styleUrls: ['./api-unavailable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiUnavailableComponent implements OnInit {
  constructor(private _apiHealthCheckService: ApiHealthCheckService, private _location: Location) {}

  ngOnInit(): void {
    this._apiHealthCheckService
      .isHealthy()
      .pipe(filter(isHealthy => isHealthy))
      .subscribe(() => {
        this._location.back();
      });
  }
}
