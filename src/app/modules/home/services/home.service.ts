import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/data/constants/routes';
import { Accounting_Document, ClosedSchedule, Email, POSTReserva, Reserva } from '../pages/interfaces/ireserva';

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

  GetReservationId(idReservation:number):Promise<Reserva> {
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
  GetReservationAcc(idReservation: number):Promise<Accounting_Document> {
    //http://127.0.0.1:8000/reservations/15/accounting-document/
    return this.http.get(`${API_ROUTES.RESERVATION.GET_RESERVATION}${idReservation}/accounting-document`)
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }

  sendEmail(id:Email):Promise<string>{
    // /send-email/
    return this.http.post(`${API_ROUTES.RESERVATION.GET_RESERVATION}send-email/`,id)
    .toPromise()
    .then(response => response as any)
    .catch(error => error);
  }

  //Pagos
  GetAccounting_Document() {

    return this.http.get(API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT)
      .toPromise()
      .then(response => response as any[])
      .catch(error =>error);
  }
  PostAccounting_Document(acc: Accounting_Document) {

      return this.http.post(`${API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT}`, acc)
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }
  PutAccounting_Document(acc: Accounting_Document){

      return this.http.put(`${API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT}${acc.id}`, acc)
        .toPromise()
        .then(response => response)
        .catch(error => error);
  }

  // Closed Schedules
  GetClosedSchedule() {
      return this.http.get(API_ROUTES.CLOSED_SCHEDULE.GET_CLOSED_SCHEDULE)
        .toPromise()
        .then(response => response as any[])
        .catch(error => error);
  }

  PostClosedSchedule(closed_sched: ClosedSchedule) {
    return this.http.post(`${API_ROUTES.CLOSED_SCHEDULE.GET_CLOSED_SCHEDULE}`, closed_sched)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);
  }
}
