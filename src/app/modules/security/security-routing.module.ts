import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout/logout.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {RecoverPasswordComponent} from "./recover-password/recover-password.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },{
    path: 'logout',
    component: LogoutComponent,
  },{
    path: 'change_password',
    component: ChangePasswordComponent
  },{
    path: 'recover_password',
    component: RecoverPasswordComponent
  },{
    path: '',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
