import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home/home.component';
import { QuotesSerachBarComponent } from './navbar/components/quotes-serach-bar/quotes-serach-bar.component';
import { UserMenuComponent } from './navbar/components/user-menu/user-menu.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserMenuTabComponent } from './navbar/components/user-menu/components/user-menu-tab/user-menu-tab.component';

@NgModule({
  imports: [SharedModule],
  declarations: [NavbarComponent, HomeComponent, PageNotFoundComponent, QuotesSerachBarComponent, UserMenuComponent, UserMenuTabComponent],
  exports: [NavbarComponent, HomeComponent, PageNotFoundComponent],
})
export class MainModule {}
