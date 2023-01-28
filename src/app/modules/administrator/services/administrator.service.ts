import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ERRORS_CONST } from 'src/app/data/constants';
import { API_ROUTES } from 'src/app/data/constants/routes';
import { Client, POSTClient } from '../pages/clients/interface/iclient';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  constructor(private http: HttpClient) { }
  

getClients() {

  return this.http.get(API_ROUTES.CLIENTS.GET_CLIENTS)
    .toPromise()
    .then(response => response as any[])
    .catch(error => error)
}

postClients(client: POSTClient) {
  return this.http.post(`${API_ROUTES.CLIENTS.GET_CLIENTS}`, client)
    .toPromise()
    .then(response => response)
    .catch(error => error)
  }

}
