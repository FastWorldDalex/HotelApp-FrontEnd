import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONST_LOGIN_PAGE } from 'src/app/data/constants';
import { AuthService } from '../../../../services/auth.service';
import { userLogin } from '../../interface/UserLogin';

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
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email, Validators.pattern(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{3,3})+$/)]],
      password: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {
    this.loginForm.get('username')?.setValue('admin@hotelapp.com');
  }

  authenticate() {
    this.loginValidation.username.valor = this.loginForm.get('username')?.value;
    this.loginValidation.password.valor = this.loginForm.get('password')?.value;

    if(!this.loginForm.valid){
      if(!this.loginValidation.username.isValid()|| !this.loginValidation.password.isValid()){
      console.log("valid username",this.loginValidation.username.isValid());
      console.log("error",this.loginValidation.username.error);
      console.log("valid password",this.loginValidation.password.isValid());
      console.log("error",this.loginValidation.password.error);
    }}else{
      console.log("Inicio de SESION", this.loginValidation.username.valor);
      let form:FormData = new FormData();
      form.append('username',this.loginValidation.username.valor)
      form.append('password',this.loginValidation.password.valor)
      this.authService.login(form).subscribe(r=>{

        console.log("DATA",r);
        //this.router.navigateByUrl('/home');
      })
    }
  }

  recover(){
    this.router.navigateByUrl('/login/recover');
  }

  login(){

    const usuarioLogeo: userLogin = {
      username: "admin@hotelapp.com",
      password: "12345678"
    }

    let resultado =  this.authService.login(this.loginForm.value).subscribe(r=>{

      console.log("DATA",r);

    })
    console.log(resultado);

  }
}
