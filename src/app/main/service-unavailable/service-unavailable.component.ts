import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { ApiHealthCheckService } from 'src/app/shared/services/health-check/api-health-check.service';

@Component({
  templateUrl: './service-unavailable.component.html',
  styleUrls: ['./service-unavailable.component.scss'],
})
export class ServiceUnavailableComponent implements OnInit {
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
