import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Titles } from 'src/app/shared/interface/interfaces';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { NewUsersComponent } from './components/new-users/new-users.component';
import { User, UserDTO } from './interface/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent implements OnInit{
  @ViewChild(NewUsersComponent, { static: false })
  newUsersComponent: NewUsersComponent = new NewUsersComponent();

  titulos: Titles[] = [];
  ltsUsers: UserDTO[] = [];
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
    const carga_1 = this.getUsers();
    const carga_2 = this.componentsInitials();

    Promise.all([carga_1, carga_2]).then((resp)=>{

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

  async getUsers(){
    const resp_Users = await this.adminService?.getUsers();
      if((resp_Users != null && resp_Users.status != 400) || resp_Users.length > 0){
        this.ltsUsers = resp_Users;
        this.message('success', 'exitoso', 'Busqueda realizada.')
      }else{
        this.showSuccess('Error', 'Error', `${resp_Users.error.detail}.`);
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
          this.getUsers();
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
            this.getUsers();
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
