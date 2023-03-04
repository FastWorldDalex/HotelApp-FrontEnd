import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { ERRORS_CONST } from 'src/app/data/constants';
import { API_ROUTES } from 'src/app/data/constants/routes';
import { Client } from '../../admin/pages/admin/component/main-content/component/clients/interface/iclient';
import { Room } from '../../admin/pages/admin/component/main-content/component/rooms/interface/iroom';
import { Role, User, UserDTO, UserInput } from '../pages/admin/component/main-content/component/users/interface/iuser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getClients() {

    return this.http.get(API_ROUTES.CLIENTS.GET_CLIENTS)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }

  postClients(client: Client) {
    return this.http.post(`${API_ROUTES.CLIENTS.GET_CLIENTS}`, client)
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }
  putClients(client: Client) {
    return this.http.put(`${API_ROUTES.CLIENTS.GET_CLIENTS}${client.id}`, client)
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }

  deleteClients(idClient?: number) {
    return this.http.delete(`${API_ROUTES.CLIENTS.GET_CLIENTS}${idClient}`)
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }

  getRooms() {

    return this.http.get(API_ROUTES.ROOM.GET_ROOM)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }
  postRoom(room: Room) {
    return this.http.post(`${API_ROUTES.ROOM.GET_ROOM}`, room)
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }
  putRoom(room:Room){
    return this.http.put(`${API_ROUTES.ROOM.GET_ROOM}${room.id}`, room)
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }
  deleteRoom(IdRoom?:number){
    return this.http.delete(`${API_ROUTES.ROOM.GET_ROOM}${IdRoom}`)
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }

    //Users
    getUsers() {
      return this.http.get(API_ROUTES.USER.GET_USER)
        .toPromise()
        .then(response => response as any[])
        .catch(error => error)
    }
    getUserById(idUser?: number) {
      return this.http.get(`${API_ROUTES.USER.GET_USER}${idUser}`)
        .toPromise()
        .then(response => response)
        .catch(error => error);
    }
    postUser(user: UserInput) {
      return this.http.post(`${API_ROUTES.USER.GET_USER}`, user)
        .toPromise()
        .then(response => response)
        .catch(error => error)
    }
    putUser(user?: UserInput) {
      return this.http.put(`${API_ROUTES.USER.GET_USER}${user?.id}`, user)
        .toPromise()
        .then(response => response)
        .catch(error => error)
    }
    deleteUser(idUser?: number) {
      return this.http.delete(`${API_ROUTES.USER.GET_USER}${idUser}`)
        .toPromise()
        .then(response => response)
        .catch(error => error)
    }
  //Roles
  getRoles() {
    return this.http.get(API_ROUTES.ROLE.GET_ROLE)
      .toPromise()
      .then(response => response as any[])
      .catch(error => error)
  }
  postRoles(role: Role) {
    return this.http.post(`${API_ROUTES.ROLE.GET_ROLE}`, role)
      .toPromise()
      .then(response => response)
      .catch(error => error)
  }
  putRole(role:Role){
    return this.http.put(`${API_ROUTES.ROLE.GET_ROLE}${role.id}`, role)
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }
  deleteRole(IdRole?:number){
    return this.http.delete(`${API_ROUTES.ROLE.GET_ROLE}${IdRole}`)
        .toPromise()
        .then(response => response)
        .catch(error => error)
  }
}
