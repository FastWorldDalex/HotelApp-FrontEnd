import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONST_LOGIN_PAGE } from 'src/app/data/constants';

@Component({
  selector: 'app-recover-sesion-form',
  templateUrl: './recover-sesion-form.component.html',
  styleUrls: ['./recover-sesion-form.component.scss']
})
export class RecoverSesionFormComponent {

  loginForm: FormGroup;
  public data = CONST_LOGIN_PAGE;
  loginValidation = this.data.FORM;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,3})+$/)]]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('email')?.setValue('Ejemplo@gmail.com');
  }

  authenticate() {
    this.loginValidation.email.valor = this.loginForm.get('email')?.value;

    if(!this.loginForm.valid){
      if(!this.loginValidation.email.isValid()){
      console.log("valid email",this.loginValidation.email.isValid());
      console.log("error",this.loginValidation.email.error);
    }}else{
      console.log("Correo Enviado", this.loginValidation.email.valor);
      this.router.navigateByUrl('/login');
    }
  }

}
