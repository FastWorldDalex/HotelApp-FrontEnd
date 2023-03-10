import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MenuItem, TreeNode } from 'primeng/api';
import { API_ROUTES } from 'src/app/data/constants/routes';

@Injectable()
export class NodeService {

    constructor(private http: HttpClient) { }

    getFiles() {
    return this.http.get<any>('assets/files.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
    }

    getUserConfiguration() {
      return this.http.get<any>('assets/user-configuration.json')
        .toPromise()
        .then(res => <MenuItem[]>res.data);
      }

      getEvents() {
        return this.http
            .get<any>('assets/calendarEvent.json')
            .toPromise()
            .then((res) => <any[]>res.data)
            .then((data) => {
                return data;
            });
    }

    getCountry(){
      return this.http.get(API_ROUTES.COUNTRY.GET_COUNTRY)
        .toPromise()
        .then(response => response as any[])
        .catch(error => error)
    }
}