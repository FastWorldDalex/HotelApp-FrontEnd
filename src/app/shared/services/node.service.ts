import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { MenuItem, TreeNode } from 'primeng/api';

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
}