import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [AuthRoutingModule],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
