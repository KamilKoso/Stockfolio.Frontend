import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material/material.module';

import { PasswordSwitchTypeDirective } from './directives/password-switch-type.directive';

@NgModule({
  imports: [CommonModule, HttpClientModule, MaterialModule, LoadingBarModule],
  declarations: [PasswordSwitchTypeDirective],
  exports: [CommonModule, HttpClientModule, PasswordSwitchTypeDirective, TranslateModule, MaterialModule, LoadingBarModule],
})
export class SharedModule {}
