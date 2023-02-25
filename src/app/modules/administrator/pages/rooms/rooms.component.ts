import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
    private confirmationService: ConfirmationService
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

  async deleteRoom(room: Room){
    if(room.status == 1){
      this.confirmationService.confirm({
        header: 'Eliminar Habitación',
        message: `¿Está seguro de eliminar la habitación ${room.name}?`,
        accept: async () => {
          const resp_Room = await this.administratorService?.deleteRoom(room.id);
            if((resp_Room!=null && resp_Room.status != 400) || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.getRooms();
            this.showSuccess('success','success',`Se eliminó la habitación ${room.name}.`)
            }else{
              console.log("FALLO INSERTAR CLIENTE");
              this.showSuccess('Error','Error', 'No se pudo eliminar la habitación.')
            }
        }
      });
    }else{
      this.confirmationService.confirm({
        header: 'Activar Habitación',
        message: `¿Está seguro de activar la habitación ${room.name}?`,
        accept: async () => {
          room.status = 1;
          const resp_Room = await this.administratorService?.putRoom(room);
            if(resp_Room!=null || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.showSuccess('success','success',`Se activo la habitación ${room.name}.`)
            }else{
              console.log("FALLO INSERTAR ROOM");
              this.showSuccess('Error','Error', 'No se pudo activar la habitación.')
            }
        }
      });
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

  async putRoom(_room: Room){
    _room.status = 0;
    const resp_Room = await this.administratorService?.putRoom(_room);
    if (resp_Room != null  && resp_Room.status != 400) {
      this.showSuccess('success','Exitoso', 'Se Inactivo una habitación.');
      window.location.reload();
    }else{
      this.showSuccess('error','Error', 'No se Inactivar.');
    }
  }


  async changeStatusRoom(room: Room){
    if(room.status == 1){
      this.confirmationService.confirm({
        header: 'Desactivar Habitación',
        message: `¿Está seguro de desactivar la habitación ${room.name}?`,
        accept: async () => {
          room.status = 0;
          const resp_Room = await this.administratorService?.putRoom(room);
            if((resp_Room!=null && resp_Room.status != 400) || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.getRooms();
            this.showSuccess('success','success',`Se desactivo la habitación ${room.name}.`)
            }else{
              room.status = 1;
              console.log("FALLO INSERTAR CLIENTE");
              this.showSuccess('Error','Error', 'No se pudo desactivar la habitación.')
            }
        }
      });
    }else{
      this.confirmationService.confirm({
        header: 'Activar Habitación',
        message: `¿Está seguro de activar la habitación ${room.name}?`,
        accept: async () => {
          room.status = 1;
          const resp_Room = await this.administratorService?.putRoom(room);
            if(resp_Room!=null || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.showSuccess('success','success',`Se activo la habitación ${room.name}.`)
            }else{
              console.log("FALLO INSERTAR ROOM");
              this.showSuccess('Error','Error', 'No se pudo activar la habitación.')
            }
        }
      });
    }
  }

}
