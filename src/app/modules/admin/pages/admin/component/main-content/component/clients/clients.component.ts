import { Component, ViewChild, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { NodeService } from 'src/app/shared/services/node.service';
import { Country, Titles } from 'src/app/shared/interface/interfaces';
import { Client } from './interface/iclient';
import { NewClientsComponent } from './components/new-clients/new-clients.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [MessageService]
})
export class ClientsComponent implements OnInit{
  @ViewChild(NewClientsComponent, { static: false })
  newClientsComponent: NewClientsComponent = new NewClientsComponent(this.nodeService,this.adminService,this.messageService);

  items: MenuItem[] =[];
  titulos: Titles[] = [];
  ltsClientes: Client[] = [];
  clientDialog: boolean = false;
  titleModal:string='';
  puedeEditar:boolean = false;
  client: Client;
  search: any;
  country_id: any;
  status_id: any;

  selectedClient: Client = {
    firstname: '',
    lastname: '',
    document: '',
    phone: '',
    email: '',
    status: 0,
    country_id: 0,
    country_name: ''
  };

  //Form Client
  countries: SelectItem[] = [];
  statusList: SelectItem[] = [];
  lstEstado: SelectItem[] = [];
  selectedEstado: string | undefined;
  //Confirm Dialog
  msgs: Message[] = [];
  constructor(
    private adminService:AdminService,
    private nodeService:NodeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.client = new Client();
    console.log(this.client);
  }

  ngOnInit() {
    const carga_1 = this.getClient(this.country_id, this.status_id, this.search);
    const carga_2 = this.getCountry();
    this.getStatusList();
    const carga_3 = this.componentsInitials();

    Promise.all([carga_1,carga_2,carga_3]).then((resp)=>{

    });
  }

  searchClient(){
    if((this.search != null && this.search != '' && this.search.length > 1)
      || (this.country_id != null && this.country_id != '')
      || (this.status_id != null && this.status_id != '') ){
      this.getClient(this.country_id, this.status_id, this.search);
    }else{
      this.getClient(null, null, null);
    }
  }

  getClient(country_id: string | null, status_id: string | null, text: string |null){
    this.adminService.getClients(country_id, status_id, text).then((clientes) => {
      if(clientes!=null || clientes.length >0){

      this.ltsClientes =clientes;
      this.ltsClientes.forEach((e)=>{
        e.country_name = e.country?.name;
      });
      this.message('success', 'exitoso', 'Busqueda realizada.')
      }else{
        this.message('error', 'error', 'Busqueda fallida.')
      }
    });
  }

  async downloadExcel(){
    const resp_excel:any = await this.adminService.downloadExcelClients(this.country_id, this.status_id, this.search);
    console.log("EXCEL", resp_excel);
    if(resp_excel.status != 400){
      window.open(resp_excel.detail, "_blank");
    } else{
      this.showSuccess('error', 'error', `${resp_excel.error.detail}.`);
    }

  }
  getStatusList(){
    this.statusList.push({ label: 'Inactivo', value: '0' });
    this.statusList.push({ label: 'Activo', value: '1' });
  }
  getCountry(){
    this.adminService.getCountry().then((paises:Country[])=>{
      paises.forEach(e => {
        this.countries.push({ label: e.name, value: e.id });
      });
    })
  }

  coreNuevo(accion:string){
    this.newClientsComponent.componentsInitials(accion,"CLIENTE");
  }
  coreEditar(accion:string, client: Client){
    this.newClientsComponent.componentsInitials(accion,"CLIENTE", client);
  }
  coreVer(accion:string, client: Client){
    this.newClientsComponent.componentsInitials(accion,"CLIENTE",client);
  }

  abrirModal(operacion:string){
    switch(operacion){
      case "NUEVO":

        this.titleModal = operacion + ' CLIENTE';
        this.clientDialog = true;
        break;
      case "EDITAR":
        this.titleModal = operacion + ' CLIENTE';
        this.clientDialog = true;
        console.log(this.client);
        this.puedeEditar = false;
        break;
        case "VER":
          this.titleModal = operacion + ' CLIENTE';
          this.clientDialog = true;
          this.puedeEditar = true;
          break;
    }
  }

  deleteClient(client: Client){
    this.confirmationService.confirm({
      header: 'Eliminar cliente',
      message: `??Est?? seguro de eliminar al cliente ${client.lastname}?`,
      accept: () => {
        this.adminService.deleteClients(client.id).then((response) => {
          if(response!=null || response.length >0){

          console.log("RESPUESTA", response);
          this.getClient(null, null, this.search);
          this.clientDialog = false;
          this.showSuccess('success','success',`Se elimino al cliente ${client.lastname}.`)
          }else{
            console.log("FALLO INSERTAR CLIENTE");
            this.showSuccess('Error','Error', 'No se pudo eliminar al cliente.')
          }
        });
      }
    });
  }
  changeStatusClient(client: Client){
    if(client.status == 1){
      this.confirmationService.confirm({
        header: 'Desactivar cliente',
        message: `??Est?? seguro de desactivar al cliente ${client.lastname}?`,
        accept: () => {
          client.status = 0;
          this.adminService.putClients(client).then((response) => {
            if((response!=null && response.status != 400) || response.length >0){

            console.log("RESPUESTA", response);
            this.getClient(null, null, this.search);
            this.showSuccess('success','success',`Se desactivo al cliente ${client.lastname}.`)
            }else{
              client.status = 1;
              console.log("FALLO INSERTAR CLIENTE");
              this.showSuccess('Error','Error', 'No se pudo desactivar al cliente.')
            }
          });
        }
      });
    }else{
      this.confirmationService.confirm({
        header: 'Activar cliente',
        message: `??Est?? seguro de activar al cliente ${client.lastname}?`,
        accept: () => {
          client.status = 1;
          this.adminService.putClients(client).then((response) => {
            if(response!=null || response.length >0){

            console.log("RESPUESTA", response);
            this.showSuccess('success','success',`Se activo al cliente ${client.lastname}.`)
            }else{
              console.log("FALLO INSERTAR CLIENTE");
              this.showSuccess('Error','Error', 'No se pudo activar al cliente.')
            }
          });
        }
      });
    }
  }

  showSuccess(type:string,title:string,msg:string) {
          this.messageService.add({severity:type, summary: title, detail: msg});
      }

  componentsInitials(){
    this.titulos = [
      {title: '#', width: 2},
      {title: 'Cliente', width: 2},
      {title: 'Documento', width: 2},
      {title: 'Tel??fono', width: 2},
      {title: 'Email', width: 2},
      {title: 'Pa??s', width: 2},
      {title: 'N?? de Reservas', width: 2},
      {title: '??ltima Reserva', width: 2},
      {title: 'Fecha de Creaci??n', width: 2},
      {title: 'Estado', width: 2},
      {title: 'Acciones', width: 2}
    ];
}

message(type:string, titulo:string, msg:string){
  this.showSuccess(type,titulo, msg)
}
}
