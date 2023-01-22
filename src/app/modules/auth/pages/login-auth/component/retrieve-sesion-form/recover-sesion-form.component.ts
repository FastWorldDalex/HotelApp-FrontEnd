import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONST_LOGIN_PAGE } from 'src/app/data/constants';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { user } from '../../../../../../shared/components/header/components/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-recover-sesion-form',
  templateUrl: './recover-sesion-form.component.html',
  styleUrls: ['./recover-sesion-form.component.scss']
})
export class RecoverSesionFormComponent {

  recoveryForm: FormGroup;
  public data = CONST_LOGIN_PAGE;
  loginValidation = this.data.FORM;
  errorMessage: any;
  infoMessage: any;
  sendForm: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.recoveryForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,3})+$/)]]
    });
  }

  ngOnInit(): void {
    this.recoveryForm.get('username')?.setValue('admin@hotelapp.com');
  }

  authenticate() {
    this.loginValidation.username.valor = this.recoveryForm.get('username')?.value;
    this.errorMessage = "";
    this.infoMessage = "";
    this.sendForm = false;
    if(!this.recoveryForm.valid){
      if(!this.loginValidation.username.isValid()){
      console.log("valid username",this.loginValidation.username.isValid());
      console.log("error",this.loginValidation.username.error);
    }}else{
      console.log("Correo Enviado", this.loginValidation.username.valor);
      let form =JSON.stringify(this.loginValidation.username.valor);
      this.authService.recoveryUser(this.recoveryForm.value).subscribe(r=>{
        if(r.error){
          this.sendForm = false;
          this.errorMessage = r.msg
        }else{
          this.sendForm = true;
          this.infoMessage = r.msg;
        }
        console.log("DATA",r);
      })
    }
  }

}
