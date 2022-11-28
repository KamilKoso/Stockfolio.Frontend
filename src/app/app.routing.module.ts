import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiUnavailableComponent } from './main/api-unavailable/api-unavailable.component';
import { HomeComponent } from './main/home/home.component';
import { PageNotFoundComponent } from './main/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent,
  },
  {
    path: 'unavailable',
    component: ApiUnavailableComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
