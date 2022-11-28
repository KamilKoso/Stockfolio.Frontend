import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [SharedModule],
  declarations: [NavbarComponent, HomeComponent, PageNotFoundComponent],
  exports: [NavbarComponent, HomeComponent, PageNotFoundComponent],
})
export class MainModule {}
