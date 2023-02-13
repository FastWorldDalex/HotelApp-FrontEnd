import { Component, Input, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { Country } from 'src/app/shared/interface/interfaces';
import { NodeService } from 'src/app/shared/services/node.service';
import { Client } from '../../interface/iclient';

@Component({
  selector: 'app-new-clients',
  templateUrl: './new-clients.component.html',
  styleUrls: ['./new-clients.component.scss']
})
export class NewClientsComponent implements OnInit{

  accion: string = '';
  titulo: string = '';
  isDisplay: boolean = false;
  isEdit: boolean = false;
  isNew: boolean = false;
  eventHtpp:boolean = false;
  client: Client;
  Estados:SelectItem[]=[{
    label: 'ACTIVO',
    value: 1,
  },{
    label: 'INACTIVO',
    value: 0,
  }];

  countries: SelectItem[] = [];
  constructor(
    private nodeService:NodeService,
    private administratorService:AdministratorService,
    private messageService: MessageService
  ) {
    this.client = new Client();
  }
  ngOnInit() {
    const carga_1 = this.getCountry();
    Promise.all([carga_1]).then((resp)=>{

    });
  }
  componentsInitials(_accion: string, _titulo: string, _data?: any): void {
    this.accion = _accion;
    this.titulo = `${_accion} ${_titulo}`;
    this.isDisplay = true;
    this.isNew = true;
    this.isEdit = false;
    switch(_accion){
      case 'NUEVO':
        break;
      case 'EDITAR':
        this.client = _data;
        this.isNew = false;
        break;
      case 'VER':
        this.client = _data;
        this.isEdit = true;
        break;
    }
  }

  getCountry(){
    this.nodeService.getCountry().then((paises:Country[])=>{
      paises.forEach(e => {
        this.countries.push({ label: e.name, value: e.id });
      });
    })
  }

  coreGuardar(operacion:string){
    switch(operacion){
      case 'NUEVO':
        window.location.reload();
        this.posClient();
        break;
      case 'EDITAR':
        window.location.reload();
        this.putClient();
    }
  }
  posClient(){
    this.client.status = 1;
    if(this.client.document.length >8 || this.client.document != '')
    {
    this.administratorService.postClients(this.client).then((response) => {
      if(response!=null || response.length >0){

      console.log("RESPUESTA", response);
      this.isDisplay = false;
      this.showSuccess('success','success', 'Se registro al nuevo cliente.');
      this.eventhttp(true);
      }else{
        console.log("FALLO INSERTAR CLIENTE");
        this.showSuccess('Error','Error', 'No se pudo registrar al cliente.');
      }
    });}else{
      this.showSuccess('error','error', 'Datos incorrectos.');

    }
  }
  putClient(){
    if(this.client.document == null){
      this.showSuccess('error','error', 'Datos incorrectos.');
      return;
    }
    if(this.client.document.length >8 || this.client.document != '' ||this.client.document != null)
    {
    this.administratorService.putClients(this.client).then((response) => {
      if(response!=null || response.length >0){

      console.log("RESPUESTA", response);
      this.isDisplay = false;
      this.showSuccess('success','success',`Se Actualizo al cliente ${this.client.lastname}.`)
      }else{
        console.log("FALLO INSERTAR CLIENTE");
        this.showSuccess('Error','Error', 'No se pudo registrar al cliente.')
      }
    });}else{
      this.showSuccess('error','error', 'Datos incorrectos.')

    }
  }

  showSuccess(type:string,title:string,msg:string) {
    this.messageService.add({severity:type, summary: title, detail: msg});
  }
  message(type:string, titulo:string, msg:string){
    this.showSuccess(type,titulo, msg)
  }

  eventhttp(event:boolean){
    this.eventHtpp = event;
  }
}
