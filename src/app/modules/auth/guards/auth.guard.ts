import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor( private router: Router) {

  }
  canActivate(): Observable<boolean> | boolean {
    console.log('canActivate');
    let istoken = sessionStorage.getItem('access_token');

    if(istoken == undefined || istoken == null){
      this.router.navigateByUrl('/auth/login');
      return false;

    }else{
      return true
    }
  }
  canLoad(): Observable<boolean> | boolean {
    console.log('canLoad');
    let istoken = sessionStorage.getItem('access_token');

    if(istoken == undefined || istoken == null){
      this.router.navigateByUrl('/auth/login');
      return false;
    }else{
      return true
    }
  }
}
