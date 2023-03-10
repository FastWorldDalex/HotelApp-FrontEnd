import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { Titles } from 'src/app/shared/interface/interfaces';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { NewUsersComponent } from './components/new-users/new-users.component';
import { User, UserDTO, Role } from './interface/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit{
  @ViewChild(NewUsersComponent, { static: false })
  newUsersComponent: NewUsersComponent = new NewUsersComponent();

  search: any;
  role_id: any;
  status_id: any;
  roles: SelectItem[] = [];

  titulos: Titles[] = [];
  ltsUsers: UserDTO[] = [];
  statusList: SelectItem[] = [];
  user: User;

  constructor(
    private adminService: AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ){
    this.user = new User();
  }

  componentsInitials(){
    this.titulos = [
      {title: '#', width: 2},
      {title: 'Nombre de usuario', width: 2},
      {title: 'Nombre', width: 2},
      {title: 'Apellido', width: 2},
      {title: 'Rol', width: 2},
      {title: 'Fecha de Creación', width: 2},
      {title: 'Estado', width: 2},
      {title: 'Acciones', width: 2}
    ];
  }

  ngOnInit() {
    const carga_1 = this.getUsers(null, null, null);
    const carga_2 = this.getRoles();
    const carga_3 = this.getStatusList();
    const carga_4 = this.componentsInitials();

    Promise.all([carga_1, carga_2, carga_3, carga_4]).then((resp)=>{

    });
  }

  coreNuevo(accion:string){
    this.newUsersComponent.componentsInitials(accion, "USUARIO");
  }
  coreEditar(accion:string, user: User){
    this.newUsersComponent.componentsInitials(accion, "USUARIO", user);
  }
  coreVer(accion:string, user: User){
    this.newUsersComponent.componentsInitials(accion, "USUARIO",user);
  }

  searchUser(){
    if((this.search != null && this.search != '' && this.search.length > 1)
      || (this.role_id != null && this.role_id != '')
      || (this.status_id != null && this.status_id != '') ){
      this.getUsers(this.role_id, this.status_id, this.search);
    }else{
      this.getUsers(null, null, null);
    }
  }
  async getUsers(role_id: string | null, status_id: string | null, text: string |null){
    const resp_Users = await this.adminService?.getUsers(role_id, status_id, text);
      if((resp_Users != null && resp_Users.status != 400) || resp_Users.length > 0){
        this.ltsUsers = resp_Users;
        this.message('success', 'exitoso', 'Busqueda realizada.')
      }else{
        this.showSuccess('Error', 'Error', `${resp_Users.error.detail}.`);
      }
  }

  getStatusList(){
    this.statusList.push({ label: 'Inactivo', value: '0' });
    this.statusList.push({ label: 'Activo', value: '1' });
  }

  getRoles(){
    this.adminService.getRoles().then((roles:Role[])=>{
      roles.forEach(e => {
        this.roles.push({ label: e.name, value: e.id });
      });
    })
  }

  async downloadExcel(){
    const resp_excel:any = await this.adminService.downloadExcelUsers();
    console.log("EXCEL", resp_excel);
    if(resp_excel.status != 400){
      window.open(resp_excel.detail, "_blank");
    } else{
      this.showSuccess('error', 'error', `${resp_excel.error.detail}.`);
    }

  }
  deleteUser(user: User){
    this.confirmationService.confirm({
      header: 'Eliminar usuario',
      message: `¿Está seguro de eliminar al usuario ${user.username}?`,
      accept: async () => {
        const resp_User = await this.adminService?.deleteUser(user.id);
          if(resp_User != null || resp_User.status != 400){

          console.log("RESPUESTA", resp_User);
          this.getUsers(this.role_id, this.status_id, this.search);
          this.showSuccess('success','success',`Se elimino al usuario ${user.username}.`)
          }else{
            console.log("FALLO INSERTAR USUARIO");
            this.showSuccess('Error','Error', `${resp_User.error.detail}.`)
          }
      }
    });
  }

  changeStatusUser(user: User){
    if(user.status == 1){
      this.confirmationService.confirm({
        header: 'Desactivar usuario',
        message: `¿Está seguro de desactivar al usuario ${user.username}?`,
        accept: async () => {
          user.status = 0;
          const resp_User = await this.adminService?.putUser(user);
            if((resp_User != null && resp_User.status != 400) || resp_User.length >0){

            console.log("RESPUESTA", resp_User);
            this.getUsers(this.role_id, this.status_id, this.search);
            this.showSuccess('success','success',`Se desactivo al usuario ${user.username}.`)
            }else{
              user.status = 1;
              console.log("FALLO INSERTAR USUARIO");
              this.showSuccess('Error','Error', `${resp_User.error.detail}.`)
            }
        }
      });
    }else{
      this.confirmationService.confirm({
        header: 'Activar usuario',
        message: `¿Está seguro de activar al usuario ${user.username}?`,
        accept: async () => {
          user.status = 1;
          const resp_User = await this.adminService?.putUser(user);
            if( (resp_User != null && resp_User.status != 400) || resp_User.length >0){

            console.log("RESPUESTA", resp_User);
            this.showSuccess('success','success',`Se activo al usuario ${user.username}.`)
            }else{
              console.log("FALLO INSERTAR USUARIO");
              this.showSuccess('Error','Error', `${resp_User.error.detail}.`)
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
