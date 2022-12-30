import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from '../shared/guards/auth/is-logged-in.guard';
import { IsNotLoggedInGuard } from '../shared/guards/auth/is-not-logged-in.guard';

const routes: Routes = [
  {
    path: 'quote',
    loadChildren: () => import('./quotes/quotes.module').then(m => m.QuotesModule),
    // canLoad: [IsLoggedInGuard],
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    // canLoad: [IsNotLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
