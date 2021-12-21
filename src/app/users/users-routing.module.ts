import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './forgot/forgot.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UsersComponent } from './users.component';
import { ResetComponent } from './reset/reset.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent, pathMatch: 'prefix',
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'signup', component: SignupComponent},
      {path: 'forgot', component: ForgotComponent},
      {path: 'verify', component: ResetComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

export const usersRoutingComponents = [UsersComponent, LoginComponent, SignupComponent, ForgotComponent, ResetComponent];
