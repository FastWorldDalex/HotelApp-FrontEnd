import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/data/constants/routes';
import { Accounting_Document, ClosedSchedule, Email, POSTReserva, Reserva } from '../pages/admin/component/main-content/component/calendar/interface/ireserva';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private auth_token = sessionStorage.getItem("access_token") != null ? sessionStorage.getItem("access_token")  : '';
  private headers  = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  });

  constructor(private http: HttpClient) { }

  GetReservation(FechaInicio: string | null, FechaFin: string | null) {
    //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-03-30'

      return this.http.get(API_ROUTES.RESERVATION.GET_RESERVATION,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);

  }

  PostReservation(postReserva: POSTReserva) {
    //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-01-28'

      return this.http.post(API_ROUTES.RESERVATION.GET_RESERVATION, postReserva, { headers: this.headers })
      .toPromise()
      .then(response => response as any)
      .catch(error => error);

  }
  PutReservation(postReserva: POSTReserva) {

      return this.http.put(`${API_ROUTES.RESERVATION.GET_RESERVATION}${postReserva.id}`, postReserva, { headers: this.headers })
      .toPromise()
      .then(response => response as any)
      .catch(error => error);

  }

  GetReservationId(idReservation:number):Promise<Reserva> {
    //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-03-30'

      return this.http.get(`${API_ROUTES.RESERVATION.GET_RESERVATION}${idReservation}`,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);

  }
  GetRoom() {

      return this.http.get(API_ROUTES.ROOM.GET_ROOM,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);
  }
  GetReservationAcc(idReservation: number):Promise<Accounting_Document> {
    //http://127.0.0.1:8000/reservations/15/accounting-document/
    return this.http.get(`${API_ROUTES.RESERVATION.GET_RESERVATION}${idReservation}/accounting-document`,{ headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }

  sendEmail(id:Email):Promise<string>{
    // /send-email/
    return this.http.post(`${API_ROUTES.RESERVATION.GET_RESERVATION}send-email/`,id, { headers: this.headers })
    .toPromise()
    .then(response => response as any)
    .catch(error => error);
  }

  //Descargar PDF
  GetReservationPDF(idReservation: number):Promise<any> {
    return this.http.get(`${API_ROUTES.RESERVATION.GET_RESERVATION}${idReservation}/download-pdf`,{ headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }

  //Pagos
  GetAccounting_Document() {

    return this.http.get(API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error =>error);
  }
  PostAccounting_Document(acc: Accounting_Document) {

      return this.http.post(`${API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT}`, acc, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error);
  }
  PutAccounting_Document(acc: Accounting_Document){

      return this.http.put(`${API_ROUTES.ACCOUNTING_DOCUMENT.GET_ACCOUNT_DOCUMENT}${acc.id}`, acc, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error);
  }

  // Closed Schedules
  GetClosedSchedule() {
      return this.http.get(API_ROUTES.CLOSED_SCHEDULE.GET_CLOSED_SCHEDULE,{ headers: this.headers })
        .toPromise()
        .then(response => response as any[])
        .catch(error => error);
  }

  PostClosedSchedule(closed_sched: ClosedSchedule) {
    return this.http.post(`${API_ROUTES.CLOSED_SCHEDULE.GET_CLOSED_SCHEDULE}`, closed_sched, { headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);
  }
}
