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
    data:FormData
  ): Observable<{
    error: boolean;
    msg: string;
    data: any;
    access_token:string;
    modules: string;
    user: any;
  }> {
    const response = {
      error: true, msg: ERRORS_CONST.LOGIN.ERROR, data: null, access_token:'', modules:'', user:[]
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*'})
    };
    return this.http.post<{error:boolean, msg: string, data:any, access_token:string, modules: string, user : any}>(API_ROUTES.AUTH.LOGIN, data, httpOptions)
      .pipe(
        map( r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          response.access_token = r.access_token
          response.modules = r.modules
          response.user = r.user
          //this.setUserToLocalStorage(r.data);
          this.currentUser.next(r.data);
          console.log("ERROR", r);

          if(!response.error){
            sessionStorage.setItem("access_token",JSON.stringify(r.access_token));
            sessionStorage.setItem("modules",JSON.stringify(r.modules));
            sessionStorage.setItem("user",JSON.stringify(r.user));
            this.router.navigateByUrl(INTERNAL_ROUTES.CALENDAR);
            console.log("entro",r.access_token);
          }
          return response;
        }),
        catchError(e => {
          response.error = true;
          response.msg = e.error.detail;
          return of(response)
        })
      );
  }

  getCurrentUser(): Observable<{
    error: boolean;
    msg: string;
    data: any;
    access_token:string;
  }> {
    const response = {
      error: true, msg: ERRORS_CONST.LOGIN.ERROR, data: null, access_token:''
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Authorization': `Bearer ${ sessionStorage.getItem('access_token')}`})
    };
    return this.http.post<{error:boolean, msg: string, data:any, access_token:string}>(API_ROUTES.AUTH.CURRENT_USER, null, httpOptions)
      .pipe(
        map( r => {
          console.log("getCurrentUser");
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          //response.role.modules = r.role.modules
          console.log(r.data);
          if(!response.error){
            //sessionStorage.setItem("modules",JSON.stringify(r.role.modules));
            let modules = ["calendar", "clients", "rooms", "users", "roles"];
            sessionStorage.setItem("modules",JSON.stringify(modules))
            console.log("entro",r.access_token);
          }
          return response;
        }),
        catchError(e => {
          response.error = true;
          response.msg = e.error.detail;
          return of(response)
        })
      );
  }


  recoveryUser(
    data: {
      username: string;
    }
  ): Observable<{
    error: boolean;
    msg: string;
    detail: any
  }> {
    const response = {
      error: true, msg: ERRORS_CONST.LOGIN.ERROR, detail: null
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': '*/*'})
    };
    return this.http.post<{error:boolean, msg: string, detail:any}>(API_ROUTES.AUTH.RECOVERY, data, httpOptions)
      .pipe(
        map( r => {
          response.msg = r.msg;
          response.error = r.error;
          response.detail = r.detail;
          response.msg = r.detail;
          return response;
        }),
        catchError(e => {
          response.error = true;
          response.msg = e.error.detail;
          return of(response)
        })
      );
  }

  changePassword(
    data: {
      username: string;
      password: string;
      token: string;
    }
  ): Observable<{
    error: boolean;
    msg: string;
    data: any
  }> {
    const response = {
      error: true, msg: ERRORS_CONST.LOGIN.ERROR, data: null
    };

    return this.http.post<{error:boolean, msg: string, data:any}>(API_ROUTES.AUTH.CHANGE_PASSWORD, data)
      .pipe(
        map( r => {
          response.msg = r.msg;
          response.error = r.error;
          response.data = r.data;
          this.currentUser.next(r.data);
          if(!response.error){
            this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
          }
          return response;
        }),
        catchError(e => {
          response.msg = e
          return of(response)
        })
      );
  }

  logOut(){
    localStorage.removeItem(this.nameUserSS);
    let nulo:any;
    this.currentUser.next(nulo);
    this.router.navigateByUrl(INTERNAL_ROUTES.AUTH_LOGIN);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("modules");
    sessionStorage.removeItem("user");
    sessionStorage.clear();

  }

  private setUserToLocalStorage(user: iApiUserAuthenticated){
    sessionStorage.setItem(this.nameUserSS, JSON.stringify(user));
  }
}
