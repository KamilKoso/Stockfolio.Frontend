import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsNotLoggedInGuard } from '../shared/guards/auth/is-not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [IsNotLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
