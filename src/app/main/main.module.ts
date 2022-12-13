import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { QuotesSerachBarComponent } from './navbar/components/quotes-serach-bar/quotes-serach-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [SharedModule],
  declarations: [NavbarComponent, HomeComponent, PageNotFoundComponent, QuotesSerachBarComponent],
  exports: [NavbarComponent, HomeComponent, PageNotFoundComponent],
})
export class MainModule {}
