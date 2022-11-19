import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from '../features/auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ApiUnhealthyGuard } from './service-unavailable/guards/api-unhealthy.guard';

@NgModule({
  imports: [SharedModule],
  declarations: [NavbarComponent, HomeComponent, PageNotFoundComponent, LoginComponent],
  providers: [ApiUnhealthyGuard],
  exports: [NavbarComponent, HomeComponent, PageNotFoundComponent],
})
export class MainModule {}
