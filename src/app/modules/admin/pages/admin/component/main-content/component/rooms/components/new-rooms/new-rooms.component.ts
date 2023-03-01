import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { Room } from './../../interface/iroom';

@Component({
  selector: 'app-new-rooms',
  templateUrl: './new-rooms.component.html',
  styleUrls: ['./new-rooms.component.scss']
})
export class NewRoomsComponent {
  accion: string = '';
  titulo: string = '';
  isDisplay: boolean = false;
  isEdit: boolean = false;
  isNew: boolean = false;
  eventHtpp: boolean = false;
  room: Room = new Room();
  Estados: SelectItem[] = [{
    label: 'INACTIVO',
    value: 0,
  }, {
    label: 'ACTIVO',
    value: 1,
  }];

  lstTpHabitaciones: SelectItem[] = [{
    label: 'Básica',
    value: 3,
  }, {
    label: 'Básica Superior',
    value: 4,
  },
  {
    label: 'Superior',
    value: 5,
  },
  {
    label: 'Familiar',
    value: 1,
  },
  {
    label: 'Premium',
    value: 6,
  },
  {
    label: 'Triples',
    value: 2,
  }];

  constructor(private adminService?:AdminService,
    private messageService?: MessageService) {

  }
  componentsInitials(_accion: string, _titulo: string, _data?: any): void {
    console.log("componentsInitials")
    this.accion = _accion;
    this.titulo = `${_accion} ${_titulo}`;
    this.isDisplay = true;
    this.isNew = true;
    this.isEdit = false;
    switch (_accion) {
      case 'NUEVA':
        this.room.status = 1;
        break;
      case 'EDITAR':
        this.room = _data;
        this.isNew = false;
        break;
      case 'VER':
        this.room = _data;
        this.isEdit = true;
        break;
    }
  }
  coreGuardar() {
    switch (this.accion) {
      case 'NUEVA':
        this.postRoom();
       //

        break;
      case 'EDITAR':
       this.putRoom();
    }
  }

  async postRoom(){
    const resp_Room = await this.adminService?.postRoom(this.room);
    if (resp_Room != null  && resp_Room.status != 400) {
      this.isDisplay = false;
      this.showSuccess('success','Exisoto', 'Se Registro la nueva habitación');
      window.location.reload();
    }else{
      this.showSuccess('error','Error', 'No se pudo Registrar.');
    }
  }
  async putRoom(){

    const resp_Room = await this.adminService?.putRoom(this.room);
    if (resp_Room != null  && resp_Room.status != 400) {
      this.isDisplay = false;
      this.showSuccess('success','Exisoto', 'Se Actualizó la nueva habitación');
      window.location.reload();
    }else{
      this.showSuccess('error','Error', 'No se pudo actualizar.');
    }
  }

  showSuccess(type: string, title: string, msg: string) {
    this.messageService?.add({ severity: type, summary: title, detail: msg });
  }
}
