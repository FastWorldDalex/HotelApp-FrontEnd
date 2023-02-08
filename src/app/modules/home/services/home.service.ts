import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/data/constants/routes';
import { Accounting_Document, POSTReserva } from '../pages/interfaces/ireserva';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  GetReservation(FechaInicio: string | null, FechaFin: string | null) {
    //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-03-30'

      return this.http.get(API_ROUTES.RESERVATION.GET_RESERVATION)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);

  }

  PostReservation(postReserva: POSTReserva) {
    //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-01-28'

      return this.http.post(API_ROUTES.RESERVATION.GET_RESERVATION,postReserva)
      .toPromise()
      .then(response => response as any)
      .catch(error => error);

  }
  PutReservation(postReserva: POSTReserva) {

      return this.http.put(`${API_ROUTES.RESERVATION.GET_RESERVATION}${postReserva.id}`,postReserva)
      .toPromise()
      .then(response => response as any)
      .catch(error => error);

  }

  GetReservationId(idReservation:number) {
    //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-03-30'

      return this.http.get(`${API_ROUTES.RESERVATION.GET_RESERVATION}${idReservation}`)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);

  }
  GetRoom() {

      return this.http.get(API_ROUTES.ROOM.GET_ROOM)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);

  }
  
  GetAccounting_Document() {

    return this.http.get(API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT)
      .toPromise()
      .then(response => response as any[])
      .catch(error =>error);
  }
  PostAccounting_Document(accounting_document: Accounting_Document) {

      return this.http.post(`${API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT}`, accounting_document)
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }
}
