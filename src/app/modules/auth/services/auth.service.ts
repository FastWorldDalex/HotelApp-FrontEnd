import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { userLogin } from '../pages/login-auth/interface/UserLogin';
import { iApiUserAuthenticated } from '../../../data/interfaces/api/iapi-auth-user.metadata';
import { Router } from '@angular/router';
import { ERRORS_CONST } from '../../../data/constants/error/errors.const';
import { API_ROUTES } from '../../../data/constants/routes/api.routes';
import { INTERNAL_ROUTES } from '../../../data/constants/routes/internal.routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: BehaviorSubject<iApiUserAuthenticated>;

  public nameUserSS: string = 'currentUserDesignicode';
  constructor(private http: HttpClient, private router: Router) {
    let session: any = sessionStorage.getItem(this.nameUserSS);

    this.currentUser = new BehaviorSubject(JSON.parse(session));
  }

  authAccesoLogin(usuario: userLogin) {}

  get getUser(): iApiUserAuthenticated {
    return this.currentUser.value;
  }

  login(
    data: {

      username: string;
    }
  ): Observable<{
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {
      error: true, msg: ERRORS_CONST.LOGIN.ERROR, data: null
    };
    const httpOptions = {
      headers: new HttpHeaders({
          'Postman-Token': '<calculated when request is sent>',
          'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
          'Content-Length': '<calculated when request is sent>',
          'Host': '<calculated when request is sent>'
          //Authorization: 'my-auth-token'

      })
  };
    return this.http.post<{error:boolean, msg: string, data:any}>('http://137.184.29.255/auth/token', data,httpOptions)
      .pipe(
        map( r => {
          console.log("Recibo", r);
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          this.setUserToLocalStorage(r.data);
          this.currentUser.next(r.data);
         
          
          if(!response.error){
            this.router.navigateByUrl(INTERNAL_ROUTES.HOME);
          }
          return response;
        }),
        catchError(e => {
          console.log("RECIBO ERR", e);
          this.router.navigateByUrl(INTERNAL_ROUTES.HOME);
          response.msg = e
          return of(response)
        })
      );
  }

 
  login2(user:any):Observable<any>{
    return this.http.post<any>('/auth/token',user)
  }
  

  logOut(){
    localStorage.removeItem(this.nameUserSS);
    let nulo:any;
    this.currentUser.next(nulo);
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
  }

  private setUserToLocalStorage(user: iApiUserAuthenticated){
    sessionStorage.setItem(this.nameUserSS, JSON.stringify(user));
  }
}
