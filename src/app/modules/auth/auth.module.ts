import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginAuthComponent } from './pages/login-auth/login-auth.component';
import { ReactiveFormsModule} from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { SesionFormComponent } from './pages/login-auth/component/sesion-form/sesion-form.component';
import { RecoverSesionFormComponent } from './pages/login-auth/component/retrieve-sesion-form/recover-sesion-form.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginAuthComponent,
    SesionFormComponent,
    RecoverSesionFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class AuthModule { }
