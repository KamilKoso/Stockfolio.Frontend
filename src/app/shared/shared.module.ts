import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';

import { PasswordSwitchTypeDirective } from './directives/password-switch-type.directive';
import { HttpAuthInterceptor } from './interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor';
import { HttpRetryInterceptor } from './interceptors/http-retry.interceptor';

@NgModule({
  imports: [CommonModule, HttpClientModule, MaterialModule, LoadingBarModule],
  declarations: [PasswordSwitchTypeDirective],
  exports: [CommonModule, HttpClientModule, PasswordSwitchTypeDirective, TranslateModule, MaterialModule, LoadingBarModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRetryInterceptor, multi: true },
  ],
})
export class SharedModule {}
