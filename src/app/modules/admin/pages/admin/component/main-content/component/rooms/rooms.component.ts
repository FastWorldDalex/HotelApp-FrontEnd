import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { Titles } from 'src/app/shared/interface/interfaces';
import { Room } from './interface/iroom';
import { RoomType } from './interface/irooomtype';
import { NewRoomsComponent } from './components/new-rooms/new-rooms.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [MessageService]
})

export class RoomsComponent implements OnInit{
  @ViewChild(NewRoomsComponent, { static: false })
  newRoomsComponent: NewRoomsComponent = new NewRoomsComponent();

  search: any;
  type_id: any;
  status_id: any;

  types: SelectItem[] = [];
  titulos: Titles[] = [];
  statusList: SelectItem[] = [];
  ltsRooms: Room[] = [];
  room: Room;

  constructor(
    private adminService:AdminService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.room = new Room();
  }

  ngOnInit() {
    const carga_1 = this.getRooms(this.type_id, this.status_id, this.search);
    const carga_2 = this.componentsInitials();
    const carga_3 =this.getTypes();
    this.getStatusList();
    Promise.all([carga_1, carga_2, carga_3]).then((resp)=>{

    });
  }

  searchRoom(){
    if((this.search != null && this.search != '' && this.search.length > 1)
      || (this.type_id != null && this.type_id != '')
      || (this.status_id != null && this.status_id != '') ){
      this.getRooms(this.type_id, this.status_id, this.search);
    }else{
      this.getRooms(null, null, null);
    }
  }


  getRooms(type_id: string | null, status_id: string | null, text: string |null){
    this.adminService.getRooms(type_id, status_id, text).then((rooms) => {
      if(rooms!=null || rooms.length >0){
        this.ltsRooms = rooms;
        this.message('success', 'exitoso', 'Busqueda realizada.')
      }else{
        this.message('error', 'error', 'Busqueda fallida.')
      }
    });
  }

  getStatusList(){
    this.statusList.push({ label: 'Inactivo', value: '0' });
    this.statusList.push({ label: 'Activo', value: '1' });
  }

  getTypes(){
    this.adminService.getRoomType().then((types:RoomType[])=>{
      types.forEach(e => {
        this.types.push({ label: e.name, value: e.id });
      });
    })
  }

  async downloadExcel(){
    const resp_excel:any = await this.adminService.downloadExcelRooms();
    console.log("EXCEL", resp_excel);
    if(resp_excel.status != 400){
      window.open(resp_excel.detail, "_blank");
    } else{
      this.showSuccess('error', 'error', `${resp_excel.error.detail}.`);
    }

  }

  showSuccess(type:string,title:string,msg:string) {
    this.messageService.add({severity:type, summary: title, detail: msg});
  }

  coreNuevo(accion:string){
    this.newRoomsComponent.componentsInitials(accion,"HABITACI??N");
  }
  coreEditar(accion:string, room: Room){
    this.newRoomsComponent.componentsInitials(accion,"HABITACI??N", room);
  }
  coreVer(accion:string, room: Room){
    this.newRoomsComponent.componentsInitials(accion,"HABITACI??N",room);
  }

  async deleteRoom(room: Room){
    if(room.status == 1){
      this.confirmationService.confirm({
        header: 'Eliminar Habitaci??n',
        message: `??Est?? seguro de eliminar la habitaci??n ${room.name}?`,
        accept: async () => {
          const resp_Room = await this.adminService?.deleteRoom(room.id);
            if((resp_Room!=null && resp_Room.status != 400) || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.getRooms(this.type_id, this.status_id, this.search);
            this.showSuccess('success','success',`Se elimin?? la habitaci??n ${room.name}.`)
            }else{
              console.log("FALLO INSERTAR CLIENTE");
              this.showSuccess('Error','Error', 'No se pudo eliminar la habitaci??n.')
            }
        }
      });
    }else{
      this.confirmationService.confirm({
        header: 'Activar Habitaci??n',
        message: `??Est?? seguro de activar la habitaci??n ${room.name}?`,
        accept: async () => {
          room.status = 1;
          const resp_Room = await this.adminService?.putRoom(room);
            if(resp_Room!=null || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.showSuccess('success','success',`Se activo la habitaci??n ${room.name}.`)
            }else{
              console.log("FALLO INSERTAR ROOM");
              this.showSuccess('Error','Error', 'No se pudo activar la habitaci??n.')
            }
        }
      });
    }
  }

  componentsInitials(){
    this.titulos = [
      {title: '#', width: 2},
      {title: 'Nombre', width: 2},
      {title: 'Descripci??n', width: 2},
      {title: 'Precio', width: 2},
      {title: 'Capacidad', width: 2},
      {title: 'Tipo', width: 2},
      {title: 'Fecha de Creaci??n', width: 2},
      {title: 'Estado', width: 2},
      {title: 'Acciones', width: 2}
    ];
  }

  message(type:string, titulo:string, msg:string){
    this.showSuccess(type, titulo, msg)
  }

  async putRoom(_room: Room){
    _room.status = 0;
    const resp_Room = await this.adminService?.putRoom(_room);
    if (resp_Room != null  && resp_Room.status != 400) {
      this.showSuccess('success','Exitoso', 'Se Inactivo una habitaci??n.');
      window.location.reload();
    }else{
      this.showSuccess('error','Error', 'No se Inactivar.');
    }
  }


  async changeStatusRoom(room: Room){
    if(room.status == 1){
      this.confirmationService.confirm({
        header: 'Desactivar Habitaci??n',
        message: `??Est?? seguro de desactivar la habitaci??n ${room.name}?`,
        accept: async () => {
          room.status = 0;
          const resp_Room = await this.adminService?.putRoom(room);
            if((resp_Room!=null && resp_Room.status != 400) || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.getRooms(this.type_id, this.status_id, this.search);
            this.showSuccess('success','success',`Se desactivo la habitaci??n ${room.name}.`)
            }else{
              room.status = 1;
              console.log("FALLO INSERTAR CLIENTE");
              this.showSuccess('Error','Error', 'No se pudo desactivar la habitaci??n.')
            }
        }
      });
    }else{
      this.confirmationService.confirm({
        header: 'Activar Habitaci??n',
        message: `??Est?? seguro de activar la habitaci??n ${room.name}?`,
        accept: async () => {
          room.status = 1;
          const resp_Room = await this.adminService?.putRoom(room);
            if(resp_Room!=null || resp_Room.length >0){

            console.log("RESPUESTA", resp_Room);
            this.showSuccess('success','success',`Se activo la habitaci??n ${room.name}.`)
            }else{
              console.log("FALLO INSERTAR ROOM");
              this.showSuccess('Error','Error', 'No se pudo activar la habitaci??n.')
            }
        }
      });
    }
  }
}
