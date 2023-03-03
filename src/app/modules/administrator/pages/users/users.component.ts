import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Titles } from 'src/app/shared/interface/interfaces';
import { AdministratorService } from '../../services/administrator.service';
import { RoomsComponent } from '../rooms/rooms.component';
import { NewUsersComponent } from './components/new-users/new-users.component';
import { User } from './interface/iuser';

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
  ltsUsers: User[] = [];
  user: User;

  constructor(
    private administratorService: AdministratorService,
    private messageService: MessageService
  ){
    this.user = new User();
  }

  componentsInitials(){
    this.titulos = [
      {title: '#', width: 2},
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
    this.administratorService.getUsers().then((users) => {
      if(users != null || RoomsComponent.length > 0){
        this.ltsUsers = users;
      }else{
        console.log("Error");
      }
    });
  }


  showSuccess(type:string, title:string, msg:string) {
    this.messageService.add({severity:type, summary: title, detail: msg});
  }
  message(type:string, titulo:string, msg:string){
    this.showSuccess(type, titulo, msg)
  }
}
