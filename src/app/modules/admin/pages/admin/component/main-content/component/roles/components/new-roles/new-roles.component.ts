import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { SelectItem } from 'src/app/shared/interface/interfaces';
import { Rol, RolInput } from '../../interface/irole';

@Component({
  selector: 'app-new-roles',
  templateUrl: './new-roles.component.html',
  styleUrls: ['./new-roles.component.scss']
})
export class NewRolesComponent {
  accion: string = '';
  titulo: string = '';
  isDisplay: boolean = false;
  isEdit: boolean = false;
  showStatus: boolean = false;
  eventHtpp: boolean = false;
  rol: Rol = new Rol();
  Estados: SelectItem[] = [{
    label: 'ACTIVO',
    value: 1,
  },{
    label: 'INACTIVO',
    value: 0,
  }];

  constructor(private adminService?: AdminService,
    private messageService?: MessageService) {
    
  }

  componentsInitials(_accion: string, _titulo: string, _data?: any): void {
    this.accion = _accion;
    this.titulo = `${_accion} ${_titulo}`;
    this.isDisplay = true;
    this.isEdit = false;
    switch (_accion) {
      case 'NUEVO':
        this.rol.status = 1;
        this.showStatus = true;
        break;
      case 'EDITAR':
        this.rol = _data;
        this.showStatus = false;
        break;
      case 'VER':
        this.rol = _data;
        this.isEdit = true;
        this.showStatus = false;
        break;
    }
  }
  

  coreGuardar() {
    switch (this.accion) {
      case 'NUEVO':
        this.postRol();
        break;
      case 'EDITAR':
        this.putRol();
        break;
      default:
        return;
    }
  }

  async postRol(){
    const resp_Rol = await this.adminService?.postRol(this.rol);
    if(resp_Rol != null || resp_Rol.status != 400){
      this.isDisplay = false;
      this.showSuccess('success', 'Exitoso', `Se registró al rol: ${this.rol.name}.`);
      location.reload();
    }else{
      this.showSuccess('error','Error', `${resp_Rol.error.detail}.`);
    }
  }

  async putRol(){
    const resp_Rol = await this.adminService?.putRol(this.rol);
    if (resp_Rol != null || resp_Rol.status != 400) {
      this.isDisplay = false;
      console.log("RolEdited", resp_Rol)
      this.showSuccess('success','Exitoso', `Se actualizó el rol: ${this.rol.name}.`);
      location.reload();
    }else{
      this.showSuccess('error','Error', `${resp_Rol.error.detail}.`);
    }
  }



  showSuccess(type: string, title: string, msg: string) {
    this.messageService?.add({ severity: type, summary: title, detail: msg });
  }
}
