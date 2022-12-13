import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsLoggedInGuard } from 'src/app/shared/guards/auth/is-logged-in.guard';
import { IsNotLoggedInGuard } from 'src/app/shared/guards/auth/is-not-logged-in.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [IsNotLoggedInGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    // canActivate: [IsNotLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
