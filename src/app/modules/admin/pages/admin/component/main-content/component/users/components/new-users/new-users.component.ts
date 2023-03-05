import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { SelectItem } from 'src/app/shared/interface/interfaces';
import { Role, User, UserInput } from '../../interface/iuser';

@Component({
  selector: 'app-new-users',
  templateUrl: './new-users.component.html',
  styleUrls: ['./new-users.component.scss']
})
export class NewUsersComponent {
  accion: string = '';
  titulo: string = '';
  isDisplay: boolean = false;
  isEdit: boolean = false;
  isNew: boolean = false;
  showPassword: boolean = false;
  showStatus: boolean = false;
  eventHtpp: boolean = false;
  user: User = new User();
  Estados: SelectItem[] = [{
    label: 'ACTIVO',
    value: 1,
  },{
    label: 'INACTIVO',
    value: 0,
  }];
  roles: SelectItem[] = [];

  constructor(
    private adminService?: AdminService,
    private messageService?: MessageService
  ){
  }

  componentsInitials(_accion: string, _titulo: string, _data?: any): void {
    this.accion = _accion;
    this.titulo = `${_accion} ${_titulo}`;
    this.isDisplay = true;
    this.isNew = true;
    this.isEdit = false;
    switch (_accion) {
      case 'NUEVO':
        this.user.status = 1;
        this.user.password = '';
        this.showPassword = false;
        this.showStatus = true;
        break;
      case 'EDITAR':
        this.user = _data;
        this.isNew = false;
        this.showPassword = true;
        this.showStatus = false;
        break;
      case 'VER':
        this.user = _data;
        this.isEdit = true;
        this.showPassword = true;
        this.showStatus = false;
        break;
    }
  }
  ngOnInit() {
    const p1 = this.getRole();
    Promise.all([p1]).then((res) => {

    });
  }


  getRole(){
    this.adminService?.getRoles().then((lstRoles: Role[]) => {
      lstRoles.forEach(e => {
        this.roles.push({ label: e.name, value: e.id});
      });
      console.log("Roles", lstRoles);
    });
  }

  coreGuardar() {
    switch (this.accion) {
      case 'NUEVO':
        this.postUser();
        break;
      case 'EDITAR':
        this.putUser();
        break;
      default:
        return;
    }
  }

  async postUser(){
    let userInput: UserInput = {
      id:         this.user.id,
      username:   this.user.username,
      firstname:  this.user.firstname,
      lastname:   this.user.lastname,
      password:   this.user.password,
      role_id:    this.user.role_id,
      status:     this.user.status
    }
    const resp_User = await this.adminService?.postUser(userInput);
    if(resp_User != null || resp_User.status != 400){
      this.isDisplay = false;
      this.showSuccess('success', 'Exitoso', 'Se registró al nuevo usuario.');
      location.reload();
    }else{
      this.showSuccess('error','Error', `${resp_User.error.detail}.`);
    }
  }

  async putUser(){
    let userInput: UserInput = {
      id:         this.user.id,
      username:   this.user.username,
      firstname:  this.user.firstname,
      lastname:   this.user.lastname,
      password:   this.user.password,
      role_id:    this.user.role_id,
      status:     this.user.status
    }
    const resp_User = await this.adminService?.putUser(userInput);
    if (resp_User != null || resp_User.status != 400) {
      this.isDisplay = false;
      console.log("UserEdited", resp_User)
      this.showSuccess('success','Exitoso', 'Se actualizó al usuario.');
      location.reload();
    }else{
      this.showSuccess('error','Error', `${resp_User.error.detail}.`);
    }
  }


  showSuccess(type: string, title: string, msg: string) {
    this.messageService?.add({ severity: type, summary: title, detail: msg });
  }
}
