import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Titles } from 'src/app/shared/interface/interfaces';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
//import { NewRolesComponent } from './components/new-roles/new-roles.component';
import { Rol, RolDTO } from './interface/irole';
import { NewRolesComponent } from './components/new-roles/new-roles.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  providers: [MessageService]
})
export class RolesComponent implements OnInit{
  @ViewChild(NewRolesComponent, { static: false })
  newRolesComponent: NewRolesComponent = new NewRolesComponent();

  titulos: Titles[] = [];
  ltsRoles: RolDTO[] = [];
  rol: Rol;

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){
    this.rol = new Rol();
  }


  componentsInitials(){
    this.titulos = [
      {title: '#', width: 2},
      {title: 'Nombre', width: 2},
      {title: 'Módulos', width: 2},
      {title: 'Fecha de Creación', width: 2},
      {title: 'Estado', width: 2},
      {title: 'Acciones', width: 2}
    ];
  }

  ngOnInit() {
    const carga_1 = this.getRoles();
    const carga_2 = this.componentsInitials();

    Promise.all([carga_1, carga_2]).then((resp)=>{

    });
  }

  coreNuevo(accion:string){
    this.newRolesComponent.componentsInitials(accion, "ROL");
  }
  coreEditar(accion:string, rol: Rol){
    this.newRolesComponent.componentsInitials(accion, "ROL", rol);
  }
  coreVer(accion:string, rol: Rol){
    this.newRolesComponent.componentsInitials(accion, "ROL", rol);
  }


  async getRoles(){
    const resp_Roles = await this.adminService?.getRoles();
      if((resp_Roles != null && resp_Roles.status != 400) || resp_Roles.length > 0){
        this.ltsRoles = resp_Roles;
        this.message('success', 'exitoso', 'Busqueda realizada.');
      }else{
        this.showSuccess('Error', 'Error', `${resp_Roles.error.detail}.`);
      }
  }


  async downloadExcel(){
    const resp_excel:any = await this.adminService.downloadExcelRoles();
    console.log("EXCEL", resp_excel);
    if(resp_excel.status != 400){
      window.open(resp_excel.detail, "_blank");
    } else{
      this.showSuccess('error', 'error', `${resp_excel.error.detail}.`);
    }

  }

  deleteRol(rol: Rol){
    this.confirmationService.confirm({
      header: 'Eliminar rol',
      message: `¿Está seguro de eliminar al rol ${rol.name}?`,
      accept: async () => {
        const resp_Rol = await this.adminService?.deleteRol(rol.id);
          if(resp_Rol != null || resp_Rol.status != 400){

          console.log("RESPUESTA", resp_Rol);
          this.getRoles();
          this.showSuccess('success','success',`Se elimino al usuario ${rol.name}.`)
          }else{
            console.log("FALLO INSERTAR ROL");
            this.showSuccess('Error','Error', `${resp_Rol.error.detail}.`)
          }
      }
    });
  }

  changeStatusRol(rol: Rol){
    if(rol.status == 1){
      this.confirmationService.confirm({
        header: 'Desactivar rol',
        message: `¿Está seguro de desactivar al rol ${rol.name}?`,
        accept: async () => {
          rol.status = 0;
          const resp_Rol = await this.adminService?.putRol(rol);
            if((resp_Rol != null && resp_Rol.status != 400) || resp_Rol.length >0){

            console.log("RESPUESTA", resp_Rol);
            this.getRoles();
            this.showSuccess('success','success',`Se desactivo al usuario ${rol.name}.`)
            }else{
              rol.status = 1;
              console.log("FALLO INSERTAR USUARIO");
              this.showSuccess('Error','Error', `${resp_Rol.error.detail}.`)
            }
        }
      });
    }else{
      this.confirmationService.confirm({
        header: 'Activar rol',
        message: `¿Está seguro de activar al rol ${rol.name}?`,
        accept: async () => {
          rol.status = 1;
          const resp_Rol = await this.adminService?.putRol(rol);
            if( (resp_Rol != null && resp_Rol.status != 400) || resp_Rol.length >0){

            console.log("RESPUESTA", resp_Rol);
            this.showSuccess('success','success',`Se activo al usuario ${rol.name}.`)
            }else{
              console.log("FALLO INSERTAR ROL");
              this.showSuccess('Error','Error', `${resp_Rol.error.detail}.`)
            }
        }
      });
    }
  }
  showSuccess(type:string, title:string, msg:string) {
    this.messageService.add({severity:type, summary: title, detail: msg});
  }
  message(type:string, titulo:string, msg:string){
    this.showSuccess(type, titulo, msg)
  }

}

