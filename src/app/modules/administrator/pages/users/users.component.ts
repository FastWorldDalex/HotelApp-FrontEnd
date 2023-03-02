import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Titles } from 'src/app/shared/interface/interfaces';
import { AdministratorService } from '../../services/administrator.service';
import { RoomsComponent } from '../rooms/rooms.component';
import { User } from './interface/iuser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService]
})
export class UsersComponent {
  titulos: Titles[] = [];
  ltsUsers: User[] = [];
  user: User;

  constructor(
    private administratorService: AdministratorService,
    private messageService: MessageService
  ){
    this.user = new User();
  }

  ngOnInit() {
    const carga_1 = this.getUsers();
    const carga_2 = this.componentsInitials();

    Promise.all([carga_1, carga_2]).then((resp)=>{

    });
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

  showSuccess(type:string, title:string, msg:string) {
    this.messageService.add({severity:type, summary: title, detail: msg});
  }
  message(type:string, titulo:string, msg:string){
    this.showSuccess(type, titulo, msg)
  }
}
