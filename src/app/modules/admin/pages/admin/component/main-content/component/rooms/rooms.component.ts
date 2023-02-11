import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../../../../../services/admin.service';
import { Titles } from 'src/app/shared/interface/interfaces';
import { Room } from './imterface/iroom';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [MessageService]
})
export class RoomsComponent implements OnInit{
  titulos: Titles[] = [];
  ltsRooms: Room[] = [];
  room: Room;

  constructor(
    private adminService:AdminService,
    private messageService: MessageService,
  ) {
    this.room = new Room();
  }

  ngOnInit() {
    const carga_1 = this.getRooms();
    const carga_2 = this.componentsInitials();

    Promise.all([carga_1, carga_2]).then((resp)=>{

    });
  }

  getRooms(){
    this.adminService.getRooms().then((rooms) => {
      if(rooms!=null || rooms.length >0){
        this.ltsRooms = rooms;
        this.message('success', 'exitoso', 'Busqueda realizada.')
      }else{
        this.message('error', 'error', 'Busqueda fallida.')
      }
    });
  }

  showSuccess(type:string,title:string,msg:string) {
    this.messageService.add({severity:type, summary: title, detail: msg});
  }

  coreNuevo(accion:string){
  }

  coreEditar(accion:string, client: Room){
  }

  coreVer(accion:string, client: Room){

  }

  deleteRoom(room: Room){
  }
  changeStatusRoom(room: Room){
    if(room.status == 1){
    }else{

    }
  }
  componentsInitials(){
    this.titulos = [
      {title: '#', width: 2},
      {title: 'Nombre', width: 2},
      {title: 'Descripción', width: 2},
      {title: 'Precio', width: 2},
      {title: 'Capacidad', width: 2},
      {title: 'Tipo', width: 2},
      {title: 'Fecha de Creación', width: 2},
      {title: 'Estado', width: 2},
      {title: 'Acciones', width: 2}
    ];
  }

  message(type:string, titulo:string, msg:string){
    this.showSuccess(type, titulo, msg)
  }
}
