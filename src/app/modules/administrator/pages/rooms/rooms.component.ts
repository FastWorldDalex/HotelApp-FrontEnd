import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdministratorService } from '../../services/administrator.service';
import { Titles } from 'src/app/shared/interface/interfaces';
import { Room } from './interface/iroom';
import { NewRoomsComponentComponent } from './components/new-rooms.component/new-rooms.component.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [MessageService]
})

export class RoomsComponent implements OnInit{
  @ViewChild(NewRoomsComponentComponent, { static: false })
  newRoomsComponentComponent: NewRoomsComponentComponent = new NewRoomsComponentComponent();

  titulos: Titles[] = [];
  ltsRooms: Room[] = [];
  room: Room;

  constructor(
    private administratorService:AdministratorService,
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
    this.administratorService.getRooms().then((rooms) => {
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
    this.newRoomsComponentComponent.componentsInitials(accion,"CLIENTE");
  }
  coreEditar(accion:string, room: Room){
    this.newRoomsComponentComponent.componentsInitials(accion,"CLIENTE", room);
  }
  coreVer(accion:string, room: Room){
    this.newRoomsComponentComponent.componentsInitials(accion,"CLIENTE",room);
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
