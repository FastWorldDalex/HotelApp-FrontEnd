import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONST_LOGIN_PAGE } from 'src/app/data/constants';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { user } from '../../../../../../shared/components/header/components/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
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
    this.changePasswordForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,3})+$/)]]
    });
  }

  ngOnInit(): void {
    this.changePasswordForm.get('username')?.setValue('admin@hotelapp.com');
  }

  authenticate() {
    this.loginValidation.username.valor = this.changePasswordForm.get('username')?.value;
    this.errorMessage = "";
    this.infoMessage = "";
    this.sendForm = false;
    if(!this.changePasswordForm.valid){
      if(!this.loginValidation.username.isValid()){
      console.log("valid username",this.loginValidation.username.isValid());
      console.log("error",this.loginValidation.username.error);
    }}else{
      console.log("Correo Enviado", this.loginValidation.username.valor);
      let form =JSON.stringify(this.loginValidation.username.valor);
      this.authService.recoveryUser(this.changePasswordForm.value).subscribe(r=>{
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
