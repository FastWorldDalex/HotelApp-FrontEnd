import { Component } from '@angular/core';
import { br } from '@fullcalendar/core/internal-common';
import { MessageService } from 'primeng/api';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { SelectItem } from 'src/app/shared/interface/interfaces';
import { Role, User } from '../../interface/iuser';

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
        break;
      case 'EDITAR':
        this.user = _data;
        this.isNew = false;
        break;
      case 'VER':
        this.user = _data;
        this.isEdit = true;
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
        //this.postRoom();       
        break;
      case 'EDITAR':
        //this.putRoom();
        break;
      default:
        return;
    }
  }

}
