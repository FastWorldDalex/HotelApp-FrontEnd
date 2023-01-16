import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAuthComponent } from './pages/login-auth/login-auth.component';
import { RecoverSesionFormComponent } from './pages/login-auth/component/retrieve-sesion-form/recover-sesion-form.component';
import { SesionFormComponent } from './pages/login-auth/component/sesion-form/sesion-form.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
