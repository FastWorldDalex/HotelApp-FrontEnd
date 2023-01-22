import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthComponent } from './pages/login-auth/login-auth.component';
import { RecoverSesionFormComponent } from './pages/login-auth/component/retrieve-sesion-form/recover-sesion-form.component';
import { SesionFormComponent } from './pages/login-auth/component/sesion-form/sesion-form.component';
import { ChangePasswordComponent } from './pages/login-auth/component/change-password/change-password.component';

const routes: Routes = [
  {
    path:'login',
    component: LoginAuthComponent,
    children:[
      {
        path:'',
        component: SesionFormComponent
      },
      {
        path:'recover',
        component: RecoverSesionFormComponent
      },
      {
        path:'change-password',
        component: ChangePasswordComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
