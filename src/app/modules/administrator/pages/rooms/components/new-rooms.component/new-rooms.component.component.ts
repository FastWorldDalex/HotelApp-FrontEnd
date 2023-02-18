import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { Room } from '../../interface/iroom';

@Component({
  selector: 'app-new-rooms',
  templateUrl: './new-rooms.component.component.html',
  styleUrls: ['./new-rooms.component.component.scss']
})
export class NewRoomsComponentComponent {
  accion: string = '';
  titulo: string = '';
  isDisplay: boolean = false;
  isEdit: boolean = false;
  isNew: boolean = false;
  eventHtpp: boolean = false;
  room: Room = new Room();
  Estados: SelectItem[] = [{
    label: 'ACTIVO',
    value: 0,
  }, {
    label: 'INACTIVO',
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

  constructor(private administratorService?:AdministratorService,
    private messageService?: MessageService) {

  }
  componentsInitials(_accion: string, _titulo: string, _data?: any): void {
    this.accion = _accion;
    this.titulo = `${_accion} ${_titulo}`;
    this.isDisplay = true;
    this.isNew = true;
    this.isEdit = false;
    switch (_accion) {
      case 'NUEVO':
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
      case 'NUEVO':
        this.postRoom();
       // 
       
        break;
      case 'EDITAR':
       this.putRoom();
    }
  }

  async postRoom(){
    const resp_Room = await this.administratorService?.postRoom(this.room);
    if (resp_Room != null  && resp_Room.status != 400) {
      this.isDisplay = false;
      this.showSuccess('success','Exisoto', 'Se Registro la nueva habitación');
      window.location.reload();
    }else{
      this.showSuccess('error','Error', 'No se pudo Registrar.');
    }
  }
  async putRoom(){
    const resp_Room = await this.administratorService?.putRoom(this.room);
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
