import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROUTES } from 'src/app/data/constants/routes';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  GetReservation(FechaInicio: string | null, FechaFin: string | null) {
    //'http://127.0.0.1:8000/reservations/?start_date=2023-01-01&end_date=2023-01-28'

      return this.http.get(API_ROUTES.RESERVATION.GET_RESERVATION)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error);
    
  }
}
