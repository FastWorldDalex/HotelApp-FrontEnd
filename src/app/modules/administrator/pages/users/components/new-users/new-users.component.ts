import { Component } from '@angular/core';
import { br } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
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
  showInput: boolean = false;
  eventHtpp: boolean = false;
  user: User = new User();
  estados: SelectItem[] = [{
    label: 'INACTIVO',
    value: 0,
  }, {
    label: 'ACTIVO',
    value: 1,
  }];
  roles: SelectItem[] = [];

  constructor(
    private administratorService?: AdministratorService,
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
        this.showInput = false;
        break;
      case 'EDITAR':
        this.user = _data;
        this.isNew = false;
        this.showInput = true;
        break;
      case 'VER':
        this.user = _data;
        this.isEdit = true;
        this.showInput = true;
        break;
    }
  }
  ngOnInit() {
    const p1 = this.getRole();
    Promise.all([p1]).then((res) => {

    });
  }


  getRole(){
    this.administratorService?.getRoles().then((lstRoles: Role[]) => {
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
    const resp_User = await this.administratorService?.postUser(userInput);
    if(resp_User != null || resp_User.status != 400){
      this.isDisplay = false;
      this.showSuccess('success', 'Exitoso', 'Se registró al nuevo usuario.');
    }else{
      this.showSuccess('error','Error', 'No se pudo actualizar.');
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
    const resp_User = await this.administratorService?.putUser(userInput);
    if (resp_User != null || resp_User.status != 400) {
      this.isDisplay = false; 
      console.log("UserEdited", resp_User)
      this.showSuccess('success','Exitoso', 'Se actualizó al usuario.');
    }else{
      this.showSuccess('error','Error', 'No se pudo actualizar.');
    }
  }
  

  showSuccess(type: string, title: string, msg: string) {
    this.messageService?.add({ severity: type, summary: title, detail: msg });
  }
}
