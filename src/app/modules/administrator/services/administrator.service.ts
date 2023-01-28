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
  

getClients2(){
  let datoGet;
  this.http.get(API_ROUTES.CLIENTS.GET_CLIENTS).subscribe(data => {
    console.log(data);
    datoGet = data
  });
  
  console.log("Esto se ejecutará antes que el console log de arriba");
  return datoGet;
}

getClients() {

  return this.http.get(API_ROUTES.CLIENTS.GET_CLIENTS)
    .toPromise()
    .then(response => response as any[])
    .catch(error => error)
}
GetReservation(FechaInicio:string, FechaFin:string) {
  //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-01-28'
  return this.http.get(`${API_ROUTES.RESERVATION.GET_RESERVATION}?start_date=${FechaInicio}&end_date=${FechaFin}`)
    .toPromise()
    .then(response => response as any)
    .catch(error => error)
}

postClients(client: POSTClient) {
  return this.http.post(`${API_ROUTES.CLIENTS.GET_CLIENTS}`, client)
    .toPromise()
    .then(response => response)
    .catch(error => error)
  }

}
