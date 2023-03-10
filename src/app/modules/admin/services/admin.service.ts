import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ERRORS_CONST } from 'src/app/data/constants';
import { API_ROUTES } from 'src/app/data/constants/routes';
import { Client } from '../../admin/pages/admin/component/main-content/component/clients/interface/iclient';
import { Room } from '../../admin/pages/admin/component/main-content/component/rooms/interface/iroom';
import { Role, User, UserDTO, UserInput } from '../pages/admin/component/main-content/component/users/interface/iuser';
import { Rol, RolDTO, RolInput } from '../pages/admin/component/main-content/component/roles/interface/irole';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private auth_token = sessionStorage.getItem("access_token") != null ? sessionStorage.getItem("access_token")  : '';
  private headers  = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_token}`
  });

  constructor(private http: HttpClient) { }

  getClients(country_id: string | null, status_id: string | null, text: string | null) {
    let params = '';
    let url = API_ROUTES.CLIENTS.GET_CLIENTS;
    if(text != null && text != ''){
      params += 'text=' + text + '&';
    }
    if(country_id != null && country_id != ''){
      params += 'country_id=' + country_id + '&';
    }
    if(status_id != null && status_id != ''){
      params += 'status=' + status_id + '&';
    }
    params = '?' + params;
    url += params;

    return this.http.get(url,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }

  postClients(client: Client) {
    return this.http.post(`${API_ROUTES.CLIENTS.GET_CLIENTS}`, client, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }
  putClients(client: Client) {
    return this.http.put(`${API_ROUTES.CLIENTS.GET_CLIENTS}${client.id}`, client, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }

  deleteClients(idClient?: number) {
    return this.http.delete(`${API_ROUTES.CLIENTS.GET_CLIENTS}${idClient}`, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }

  downloadExcelClients(country_id: string | null, status_id: string | null, text: string | null) {
    let params = '';
    let url = API_ROUTES.CLIENTS.GET_CLIENTS + 'download-excel/';
    if(text != null && text != ''){
      params += 'text=' + text + '&';
    }
    if(country_id != null && country_id != ''){
      params += 'country_id=' + country_id + '&';
    }
    if(status_id != null && status_id != ''){
      params += 'status=' + status_id + '&';
    }
    params = '?' + params;
    url += params;
    return this.http.get(url)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }

  getRooms(type_id: string | null, status_id: string | null, text: string | null) {
    let params = '';
    let url = API_ROUTES.ROOM.GET_ROOM;
    if(text != null && text != ''){
      params += 'text=' + text + '&';
    }
    if(type_id != null && type_id != ''){
      params += 'type_id=' + type_id + '&';
    }
    if(status_id != null && status_id != ''){
      params += 'status=' + status_id + '&';
    }
    params = '?' + params;
    url += params;

    return this.http.get(url,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }
  postRoom(room: Room) {
    return this.http.post(`${API_ROUTES.ROOM.GET_ROOM}`, room, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }
  putRoom(room:Room){
    return this.http.put(`${API_ROUTES.ROOM.GET_ROOM}${room.id}`, room, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }
  deleteRoom(IdRoom?:number){
    return this.http.delete(`${API_ROUTES.ROOM.GET_ROOM}${IdRoom}`, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }
  downloadExcelRooms() {
    let url = API_ROUTES.ROOM.GET_ROOM + 'download-excel/';
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }

  getRoomType() {
    return this.http.get(API_ROUTES.ROOM_TYPE.GET_ROOM_TYPE,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }
    //Users
    getUsers() {
      return this.http.get(API_ROUTES.USER.GET_USER,{ headers: this.headers })
        .toPromise()
        .then(response => response as any[])
        .catch(error => error)
    }
    getUserById(idUser?: number) {
      return this.http.get(`${API_ROUTES.USER.GET_USER}${idUser}`, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error);
    }
    postUser(user: UserInput) {
      return this.http.post(`${API_ROUTES.USER.GET_USER}`, user, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error)
    }
    putUser(user?: UserInput) {
      return this.http.put(`${API_ROUTES.USER.GET_USER}${user?.id}`, user, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error)
    }
    deleteUser(idUser?: number) {
      return this.http.delete(`${API_ROUTES.USER.GET_USER}${idUser}`, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error)
    }

  downloadExcelUsers() {
    let url = API_ROUTES.USER.GET_USER + 'download-excel/';
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }
  //Roles
  getRoles() {
    return this.http.get(API_ROUTES.ROLE.GET_ROLE,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }
  postRol(rol: Rol) {
    return this.http.post(`${API_ROUTES.ROLE.GET_ROLE}`, rol, { headers: this.headers })
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }
  putRol(rol: Rol){
    return this.http.put(`${API_ROUTES.ROLE.GET_ROLE}${rol.id}`, rol, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }
  deleteRol(IdRole?:number){
    return this.http.delete(`${API_ROUTES.ROLE.GET_ROLE}${IdRole}`, { headers: this.headers })
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }
  downloadExcelRoles() {
    let url = API_ROUTES.ROLE.GET_ROLE + 'download-excel/';
    return this.http.get(url, { headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }

  getModules(){
    return this.http.get(API_ROUTES.MODULE.GET_MODULE,{ headers: this.headers })
    .toPromise()
    .then(response => response as any[])
    .catch(error => error)
  }

  getCountry(){
    return this.http.get(API_ROUTES.COUNTRY.GET_COUNTRY,{ headers: this.headers })
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }
}
