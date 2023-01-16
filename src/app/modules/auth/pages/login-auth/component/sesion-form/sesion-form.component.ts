import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONST_LOGIN_PAGE } from 'src/app/data/constants';

@Component({
  selector: 'app-sesion-form',
  templateUrl: './sesion-form.component.html',
  styleUrls: ['./sesion-form.component.scss']
})
export class SesionFormComponent implements OnInit {

  loginForm: FormGroup;
  loginSubmitted: boolean = false;
  checked: any;
  public data = CONST_LOGIN_PAGE;
  loginValidation = this.data.FORM;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,3})+$/)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('email')?.setValue('Ejemplo@gmail.com');
  }

  authenticate() {
    this.loginValidation.email.valor = this.loginForm.get('email')?.value;
    this.loginValidation.password.valor = this.loginForm.get('password')?.value;

    if(!this.loginForm.valid){
      if(!this.loginValidation.email.isValid()|| !this.loginValidation.password.isValid()){
      console.log("valid email",this.loginValidation.email.isValid());
      console.log("error",this.loginValidation.email.error);
      console.log("valid password",this.loginValidation.password.isValid());
      console.log("error",this.loginValidation.password.error);
    }}else{
      console.log("Inicio de SESION", this.loginValidation.email.valor);
      this.router.navigateByUrl('/home');
    }
  }

  recover(){
    this.router.navigateByUrl('/login/recover');
  }
}
